import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart, IPostCart } from '../../../modles/cart.modle';
import { Observable, of } from 'rxjs';
import { IProduct } from '../../../modles/product.modle';

@Injectable({
  providedIn: 'root',
})
export class CartRequestService {
  constructor(private http: HttpClient) {}

  addToCart(product: string, quantity = 1) {
    console.log(product);
    return this.http.post(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/cart/add',
      { product, quantity }
    );
  }

  getUserCartRequest(): Observable<ICart[]> {
    return this.http.get<ICart[]>(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/cart'
    );
  }

  updateCartRequest(carts: IPostCart[]) {
    return this.http.patch<string>(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/cart',
      {
        carts,
      }
    );
  }

  updateWishListRequest(product: string) {
    return this.http.post<string>(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/profile/wish-list',
      { product }
    );
  }

  removeCartRequest(productId: string) {
    return this.http.delete<string>(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/cart/' + productId
    );
  }

  clearCartRequest() {}
}
