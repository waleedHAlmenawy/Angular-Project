import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoryRequestsService } from '../../../services/category/category-requests.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '../../../../modles/category';
import { SuccessPopUpComponent } from '../../../shared/success-pop-up/success-pop-up.component';
import { take, timer } from 'rxjs';
import { PopUpErrorComponent } from '../../../shared/pop-up-error/pop-up-error.component';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrl: './add-new-category.component.css',
})
export class AddNewCategoryComponent {
  constructor(
    private formBuilder: FormBuilder,
    private categoryRequestsService: CategoryRequestsService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddNewCategoryComponent>
  ) {}

  categoryForm: FormGroup = this.formBuilder.group({
    nameCategory: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(2500),
    ]),
    icon: new FormControl<String>(
      'https://cdn1.iconfinder.com/data/icons/family-68/512/grocery-shopping-bag-store-groceries-512.png',
      [Validators.required]
    ),
  });

  imageData: String = "https://cdn.icon-icons.com/icons2/1863/PNG/512/category_119307.png";

  initialFormValues = {
    nameCategory: '',
    description: '',
    icon: 'https://cdn1.iconfinder.com/data/icons/family-68/512/grocery-shopping-bag-store-groceries-512.png',
  };

  getFormControl(controlName: string) {
    return this.categoryForm.get(controlName);
  }

  closePopup() {
    this.dialogRef.close();
  }

  openSuccessPopUp() {
    const dialog = this.dialog.open(SuccessPopUpComponent, {
      data: { text: 'Added Successfully' },
    });

    timer(3000)
      .pipe(take(1))
      .subscribe(() => {
        dialog.close();
        this.closePopup();
      });
  }

  openErrorPopUp() {
    const dialog = this.dialog.open(PopUpErrorComponent);

    timer(3000)
      .pipe(take(1))
      .subscribe(() => {
        dialog.close();
      });
  }

  onFileSelect(event: Event) {
    let file = (event.target as HTMLInputElement).files?.[0];

    const allowedMimeTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
    ];

    this.categoryForm.patchValue({ icon: file });

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;

        console.log(this.imageData);
      };
      reader.readAsDataURL(file);
    }
  }

  addNewCategory() {
    if (this.categoryForm.valid) {

      let catData = new FormData();

      catData.append('nameCategory', this.categoryForm.value.nameCategory);
      catData.append('description', this.categoryForm.value.description);
      catData.append('icon', this.categoryForm.value.icon);

      console.log(this.categoryForm.value);
      this.categoryRequestsService
        .addNewCategoryUpdate(catData)
        .subscribe(
          (category) => {
            if (category) {
              console.log(category);
              this.openSuccessPopUp();
            }
          },
          (error) => {
            this.openErrorPopUp();
            console.log(error);
          }
        );
    } else {
      console.log(this.categoryForm.value);
      console.log('invalid');
    }
  }
}
