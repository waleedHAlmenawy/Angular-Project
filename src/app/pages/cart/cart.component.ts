import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Observable, Subscription, of } from 'rxjs';
import { ICart } from '../../../modles/cart.modle';
import { ActivatedRoute, Router } from '@angular/router';
import { CartRequestService } from '../../services/cart/cart.request.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(
    private cartRequestService: CartRequestService,
    private cartService: CartService,
    private router: Router
  ) {}

  cartItems: ICart[] = [];

  total = {
    price: 0,
    discount: 0,
  };

  isLoading = true;

  ngOnInit() {
    if (this.cartService.cartItems[0]) {
      this.cartItems = this.cartService.cartItems;
      this.total = this.cartService.total;
      this.cartService.calculateTotal();
      this.isLoading = false;
    } else {
      this.cartRequestService.getUserCartRequest().subscribe({
        next: (data) => (this.cartService.cartItems = data),
        error: (error) => console.log(error),
        complete: () => {
          this.cartItems = this.cartService.cartItems;
          this.isLoading = false;
        },
      });
    }
  }

  makePurches() {
    this.updateCart();
    this.router.navigate(['user', 'checkout']);
  }

  trackByProductId(index: number, cartItem: ICart): string {
    return cartItem.product._id;
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  updateCart() {
    let carts = this.cartItems.map((item) => {
      return { productId: item.product._id, quantity: +item.quantity };
    });

    this.cartRequestService
      .updateCartRequest(carts)
      .subscribe((data) => console.log(data));
  }

  updataWishList(product: string) {
    this.cartRequestService
      .updateWishListRequest(product)
      .subscribe((data) => console.log(data));
  }

  removeCart(productId: string, index: number) {
    this.cartItems.splice(index, 1);

    this.cartRequestService
      .removeCartRequest(productId)
      .subscribe((data) => console.log(data));
  }
}
