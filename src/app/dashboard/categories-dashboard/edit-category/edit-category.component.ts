import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICategory, IUpdateCategory } from '../../../../modles/category';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CategoryRequestsService } from '../../../services/category/category-requests.service';
import { Router } from '@angular/router';
import { SuccessPopUpComponent } from '../../../shared/success-pop-up/success-pop-up.component';
import { take, timer } from 'rxjs';
import { PopUpErrorComponent } from '../../../shared/pop-up-error/pop-up-error.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  category: IUpdateCategory;
  originalCategory: IUpdateCategory;
  categoryId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { categoryId: string },
    private formBuilder: FormBuilder,
    private categoryRequestsService: CategoryRequestsService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditCategoryComponent>
  ) {
    this.categoryForm = this.formBuilder.group({
      nameCategory: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(2500),
      ]),
      icon: new FormControl([''], [Validators.required]),
    });
  }

  ngOnInit() {
    const id = this.data.categoryId;
    if (id) {
      console.log(id);
      this.categoryId = id;
      this.getCategory(id);
    }
  }

  getCategory(id: string) {
    this.categoryRequestsService.getCategoryByIdRequest(id).subscribe(
      (data: ICategory) => {
        console.log(data);
        this.category = data;
        this.categoryForm.patchValue({
          ...this.category,
        });
        this.originalCategory = { ...this.category };
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getFormControl(controlName: string) {
    return this.categoryForm.get(controlName);
  }

  closePopUp() {
    this.dialogRef.close();
  }

  openErrorPopUp() {
    const dialog = this.dialog.open(PopUpErrorComponent);

    timer(3000)
      .pipe(take(1))
      .subscribe(() => {
        dialog.close();
      });
  }

  openSuccessPopUp() {
    const dialog = this.dialog.open(SuccessPopUpComponent, {
      data: { text: 'Update Successfully' },
    });

    timer(3000)
      .pipe(take(1))
      .subscribe(() => {
        dialog.close();
        this.closePopUp();
      });
  }

  updateCategory() {
    const updatedCategoryData: IUpdateCategory = {};
    Object.keys(this.categoryForm.controls).forEach((key: string) => {
      const control = this.categoryForm.get(key);
      if (
        control &&
        control.dirty &&
        control.value !== this.originalCategory[key as keyof IUpdateCategory]
      ) {
        updatedCategoryData[key as keyof IUpdateCategory] = control.value;
      }
      console.log(updatedCategoryData);
      console.log(this.categoryId);
    });
    this.category = this.categoryForm.value;
    this.categoryRequestsService
      .updateCategoryDataRequest(updatedCategoryData, this.categoryId)
      .subscribe(
        (data) => {
          if (data) {
            this.openSuccessPopUp();
            console.log(data);
          }
        },
        (error) => {
          console.log(error);
          this.openErrorPopUp();
        }
      );
  }
}
