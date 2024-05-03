import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, IUpdateProduct } from '../../../modles/product.modle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsRequestsService {
  constructor(private httpClient: HttpClient) {}

  getAllProductsRequest() {
    return this.httpClient.get<IProduct[]>(
      `https://e-commerce-nodejs-dj4i.onrender.com/api/v1/products/`
    );
  }

  getProductsSearchRequest(search: string): Observable<any> {
    return this.httpClient.get(
      `https://e-commerce-nodejs-dj4i.onrender.com/api/v1/products/search/product/${search}`
    );
  }

  getProductByIdRequest(_id: string): Observable<IProduct> {
    return this.httpClient.get<IProduct>(
      `https://e-commerce-nodejs-dj4i.onrender.com/api/v1/products/${_id}`
    );
  }

  addNewProductRequest(data: IProduct) {
    const productData = new FormData();

    productData.append('title', data.title);
    productData.append('description', data.description);
    productData.append('brand', data.brand);
    productData.append('price', `${data.price}`);
    productData.append('discount', `${data.discount}`);
    productData.append('stock', `${data.stock}`);
    productData.append('category', data.category);
    productData.append('productImages', data.thumbnail);

    for (let i = 0; i < data.images.length; i++) {
      productData.append('productImages', data.images[i]);
    }

    return this.httpClient.post<IProduct>(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/products',
      productData
    );
  }

  updateProductDataRequest(data: IUpdateProduct, _id: string) {
    return this.httpClient.patch<IUpdateProduct>(
      `https://e-commerce-nodejs-dj4i.onrender.com/api/v1/products/${_id}`,
      data
    );
  }

  deleteProductRequest(data: IProduct) {
    return this.httpClient.delete<IProduct>(
      `https://e-commerce-nodejs-dj4i.onrender.com/api/v1/products/${data._id}`
    );
  }
}
