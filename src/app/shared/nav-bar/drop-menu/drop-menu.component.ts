import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../../modles/product.modle';
import { UserProfileService } from '../../../services/user-profile/user-profile.service';
import { CartService } from '../../../services/cart/cart.service';
import { CartRequestService } from '../../../services/cart/cart.request.service';
import { Observable, Subscription } from 'rxjs';
import { UserProfileRequestService } from '../../../services/user-profile/user-profile.request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drop-menu',
  templateUrl: './drop-menu.component.html',
  styleUrl: './drop-menu.component.css',
})
export class DropMenuComponent implements OnInit {
  @Input() product: IProduct;
  constructor(
    private cartService: CartService,
    private cartRequestService: CartRequestService,
    private userProfileService: UserProfileService,
    private userProfileRequestService: UserProfileRequestService,
    private router: Router
  ) {}

  isInCart: boolean = false;
  isInWishlist: boolean = false;
  cartRequest: Observable<any>;
  wishListRequest: Observable<any>;

  isQuantityEdited: boolean = false;
  buttonStyle: string = '';

  ngOnInit() {
    if (this.cartService.productIds.includes(this.product._id)) {
      this.isInCart = true;
    }

    if (this.userProfileService.wishListProductIds.includes(this.product._id)) {
      this.isInWishlist = true;
    }
  }

  toggleCart(productId: string) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['signIn']);
      return;
    }

    if (this.isInCart) {
      let index = this.cartService.cartItems.findIndex(
        (cart) => cart.product._id == this.product._id
      );

      this.cartService.cartItems.splice(index, 1);

      this.cartRequest = this.cartRequestService.removeCartRequest(productId);

      this.isInCart = false;
    } else {
      this.cartService.cartItems.push({
        product: this.product,
        quantity: 1,
      });

      this.cartRequest = this.cartRequestService.addToCart(productId);

      this.isInCart = true;
    }

    this.cartRequest.subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
    });

    this.cartService.productIds = this.cartService.cartItems.map(
      (cart) => cart.product._id
    );
  }

  toggleWishList(productId: string) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['signIn']);
      return;
    }

    if (this.isInWishlist) {
      let index = this.userProfileService.wishList.findIndex(
        (product) => product._id == this.product._id
      );

      this.userProfileService.wishList.splice(index, 1);

      this.wishListRequest =
        this.userProfileRequestService.updateWishListRequest(productId);

      this.isInWishlist = false;
    } else {
      this.userProfileService.wishList.push(this.product);

      this.wishListRequest =
        this.userProfileRequestService.updateWishListRequest(productId);

      this.isInWishlist = true;
    }

    this.wishListRequest.subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
    });

    this.userProfileService.wishListProductIds =
      this.userProfileService.wishList.map((product) => product._id);
  }

  showDetails(productId: any) {
    this.router.navigate(['user', 'productDetails', productId]);
  }
}
