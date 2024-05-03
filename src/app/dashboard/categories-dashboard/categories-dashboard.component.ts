import { Component, OnInit } from '@angular/core';
import { CategoryRequestsService } from '../../services/category/category-requests.service';
import { MatDialog } from '@angular/material/dialog';
import { ICategory } from '../../../modles/category';
import { AddNewCategoryComponent } from './add-new-category/add-new-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@Component({
  selector: 'app-categories-dashboard',
  templateUrl: './categories-dashboard.component.html',
  styleUrl: './categories-dashboard.component.css',
})
export class CategoriesDashboardComponent implements OnInit {
  constructor(
    private categoryRequestsServices: CategoryRequestsService,
    private dialog: MatDialog
  ) {}

  allCategories: ICategory[];
  category: ICategory;
  isLoading:boolean=false;

  ngOnInit() {
    this.isLoading=true;
    this.categoryRequestsServices
      .getAllCategoriesRequest()
      .subscribe((data: any) => {
        console.log(data.data);
        this.isLoading=false;
        this.allCategories = data.data;
      });
  }

  openAddCategoryPopup() {
    this.dialog.open(AddNewCategoryComponent);
  }

  openEditCategoryPopup(category: ICategory) {
    console.log(category._id);
    this.dialog.open(EditCategoryComponent, {
      data: { categoryId: category._id },
    });
  }
}
