import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartRequestService } from '../../../services/cart/cart.request.service';
import { CartService } from '../../../services/cart/cart.service';
import { IProduct } from '../../../../modles/product.modle';
import { UserProfileService } from '../../../services/user-profile/user-profile.service';
import { UserProfileRequestService } from '../../../services/user-profile/user-profile.request.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  isClicked: boolean = false;
  isInWishlist: boolean = false;
  buttonShow: boolean = false;
  cartRequest: Observable<any>;


  buttonStyle: any = '';

  wishListRequest: Observable<any>;

  @Input() prd: IProduct = {
    _id: '',
    title: '',
    description: '',
    price: 0,
    discount: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: [''],
    rating: 0,
    reviews: [''],
    createdAt: '',
    updatedAt: '',
    isDeleted: false
  };

  constructor(
    private router: Router,
    private cartService: CartService,
    private cartRequestService: CartRequestService,
    private userProfileService: UserProfileService,
    private userProfileRequestService: UserProfileRequestService
  ) {}

  ngOnInit(): void {
    // console.log(this.cartService.productIds);
    if (this.cartService.productIds.includes(this.prd._id)) {
      this.isClicked = true;
    }

    if (this.userProfileService.wishListProductIds.includes(this.prd._id)) {
      this.isInWishlist = true;
    }
  }

  showDetails(productId: any) {
    this.router.navigate(['/user','productDetails', productId]);
  }


  toggleCart(productId: string) {
    if (this.isClicked) {
      let index = this.cartService.cartItems.findIndex(
        (cart) => cart.product._id == this.prd._id
      );

      this.cartService.cartItems.splice(index, 1);

    this.isClicked = !this.isClicked;

      this.cartRequest = this.cartRequestService.removeCartRequest(productId);

      this.isClicked = false;
    } else {
      this.cartService.cartItems.push({
        product: this.prd,
        quantity: 1,
      });

      this.cartRequest = this.cartRequestService.addToCart(productId);

      this.isClicked = true;
    }

    this.cartRequest.subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
    });

    this.cartService.productIds = this.cartService.cartItems.map(
      (cart) => cart.product._id
    );
  }

  toggleWishlist(productId: string) {
    if(!localStorage.getItem('token')){
      this.router.navigate(['signIn']);
      return;
    }

    if (this.isInWishlist) {
      let index = this.userProfileService.wishList.findIndex(
        (product) => product._id == this.prd._id
      );

      this.userProfileService.wishList.splice(index, 1);

      this.wishListRequest =
        this.userProfileRequestService.updateWishListRequest(productId);

      this.isInWishlist = false;
    } else {
      this.userProfileService.wishList.push(this.prd);

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

}
