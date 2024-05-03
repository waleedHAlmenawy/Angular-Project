import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory, IUpdateCategory } from '../../../modles/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryRequestsService {
  constructor(private httpClient: HttpClient) {}

  getAllCategoriesRequest() {
    return this.httpClient.get(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/categories'
    );
  }

  getCategoryByIdRequest(_id: string) {
    return this.httpClient.get<ICategory>(
      `https://e-commerce-nodejs-dj4i.onrender.com/api/v1/categories/${_id}`
    );
  }

  getProductsByCategoryRequest(category: ICategory) {
    return this.httpClient.get(
      `https://e-commerce-nodejs-dj4i.onrender.com/api/v1/categories/${category._id}/products`
    );
  }

  addNewCategoryUpdate(data: any) {
    console.log(data);
    return this.httpClient.post<ICategory>(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/categories',
      data
    );
  }

  updateCategoryDataRequest(data: IUpdateCategory, _id: string) {
    return this.httpClient.patch<IUpdateCategory>(
      `https://e-commerce-nodejs-dj4i.onrender.com/api/v1/categories/${_id}`,
      data
    );
  }
}
