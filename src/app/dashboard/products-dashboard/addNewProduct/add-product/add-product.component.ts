import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductsRequestsService } from '../../../../services/product/products-requests.service';
import { SuccessPopUpComponent } from '../../../../shared/success-pop-up/success-pop-up.component';
import { take, timer } from 'rxjs';
import { PopUpErrorComponent } from '../../../../shared/pop-up-error/pop-up-error.component';
import { CategoryRequestsService } from '../../../../services/category/category-requests.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  imageData: string =
    'https://cdn-icons-png.freepik.com/256/10422/10422287.png?uid=R75470738&ga=GA1.1.504546984.1708991391&';

  constructor(
    private formBuilder: FormBuilder,
    private productRequestServices: ProductsRequestsService,
    private categoryRequestsService: CategoryRequestsService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddProductComponent>
  ) {}
  numberPattern = /^[0-9]+$/;
  productForm: FormGroup = this.formBuilder.group({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(500),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(1000),
    ]),
    price: new FormControl<Number>(0, [
      Validators.required,
      Validators.pattern(this.numberPattern),
    ]),
    discount: new FormControl<Number>(0, [
      Validators.pattern(this.numberPattern),
    ]),
    stock: new FormControl<Number>(0, [
      Validators.required,
      Validators.pattern(this.numberPattern),
    ]),
    brand: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(500),
    ]),
    category: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    thumbnail: new FormControl(''),
    images: new FormControl([[]], [Validators.required]),
  });

  categories: any = [];

  ngOnInit() {
    this.categoryRequestsService
      .getAllCategoriesRequest()
      .subscribe((data: any) => {
        console.log(data);
        this.categories = data.data;
        console.log(this.categories);
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

    this.productForm.patchValue({ thumbnail: file });

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;

        console.log(this.imageData);
      };
      reader.readAsDataURL(file);
    }
  }

  onFilseSelect(event: Event) {
    let files = (event.target as HTMLInputElement).files;

    this.productForm.patchValue({ images: files });
  }

  closePopUp(): void {
    this.dialogRef.close();
  }

  getFormControl(controlName: string) {
    return this.productForm.get(controlName);
  }

  openSuccessPopUp() {
    const dialog = this.dialog.open(SuccessPopUpComponent, {
      data: { text: 'Added Successfully' },
    });

    timer(3000)
      .pipe(take(1))
      .subscribe(() => {
        dialog.close();
        this.closePopUp();
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

  addProduct() {
    this.productRequestServices
      .addNewProductRequest(this.productForm.value)
      .subscribe(
        (data) => {
          if (data) {
            console.log(data);
            this.openSuccessPopUp();
          }
        },
        (error) => {
          console.log(error);
          this.openErrorPopUp();
        }
      );
  }
}
