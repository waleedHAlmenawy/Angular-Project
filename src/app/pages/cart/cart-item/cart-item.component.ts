import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICart } from '../../../../modles/cart.modle';
import { CartService } from '../../../services/cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from '../../../services/user-profile/user-profile.service';
import { UserProfileRequestService } from '../../../services/user-profile/user-profile.request.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private userProfileService: UserProfileService,
    private userProfileRequestService: UserProfileRequestService,
    private router: Router
  ) {}

  @Input() cartItem: ICart = {
    product: {
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
    },
    quantity: 0,
  };

  isQuantityEdited: boolean = false;
  buttonStyle: string = '';
  isInWishList: boolean = false;
  wishListRequest: Observable<any>;

  ngOnInit() {
    this.isQuantityEdited = this.cartItem.quantity > 1;

    if (this.userProfileService.wishListProductIds.includes(this.cartItem.product._id)) {
      this.isInWishList = true;
    }
  }

  onClickRemove(productId: string) {
    const index = this.cartService.cartItems.findIndex(
      (item) => item.product._id === productId
    );

    this.cartService.removeCart(productId, index);
    this.cartService.calculateTotal();
  }

  onClickHeartIcon(productId: string) {
    if (this.isInWishList) {
      let index = this.userProfileService.wishList.findIndex(
        (product) => product._id == this.cartItem.product._id
      );

      this.userProfileService.wishList.splice(index, 1);

      this.wishListRequest =
        this.userProfileRequestService.updateWishListRequest(productId);

      this.isInWishList = false;
    } else {
      this.userProfileService.wishList.push(this.cartItem.product);

      this.wishListRequest =
        this.userProfileRequestService.updateWishListRequest(productId);

      this.isInWishList = true;
    }

    this.wishListRequest.subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
    });

    this.userProfileService.wishListProductIds =
      this.userProfileService.wishList.map((product) => product._id);
  }

  showDetails(productId: any) {
    this.router.navigate(['/user', 'productDetails', productId]);
  }
}
