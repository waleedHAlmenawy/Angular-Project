import { Injectable } from '@angular/core';
import { ICart } from '../../../modles/cart.modle';
import { CartRequestService } from './cart.request.service';
import { faLariSign } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private cartRequestService: CartRequestService) {}

  cartItems: ICart[] = [];
  productIds: string[] = [];

  total = {
    price: 0,
    discount: 0,
  };

  updataWishList(product: string) {
    this.cartRequestService
      .updateWishListRequest(product)
      .subscribe((data) => console.log(data));
  }

  removeCart(productId: string, index: number) {
    this.cartItems.splice(index, 1);

    this.cartRequestService.removeCartRequest(productId).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
      complete: () => this.calculateTotal(),
    });
  }

  calculateTotal() {
    let prices, discounts;

    prices = this.cartItems.map((item) => item.product.price * item.quantity);
    discounts = this.cartItems.map(
      (item) =>
        (item.product.discount / 100) * item.product.price * item.quantity
    );

    if (prices[0]) {
      this.total.price = prices.reduce((preVal, curVal) => preVal + curVal);
    } else {
      this.total.price = 0;
    }

    if (discounts[0]) {
      this.total.discount = discounts.reduce(
        (preVal, curVal) => preVal + curVal
      );
    } else {
      this.total.discount = 0;
    }
  }
}
