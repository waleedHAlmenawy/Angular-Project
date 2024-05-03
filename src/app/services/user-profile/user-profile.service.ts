import { Injectable, OnInit } from '@angular/core';
import { UserProfileRequestService } from './user-profile.request.service';
import { IProfile } from '../../../modles/profile.modle';
import { IProduct } from '../../../modles/product.modle';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private userProfileRequestService: UserProfileRequestService) {}

  user: IProfile = {
    name: '',
    email: '',
    phone: '',
    imagePath: '',
    wishList: [],
  };

  wishList: IProduct[] = [];

  wishListProductIds: string[] = [];

  patchUser(userModel: any) {
    this.userProfileRequestService.patchUserRequest(userModel).subscribe({
      next: (data) => {
        if (data.name) {
          this.user.name = data.name;
        }

        if (data.imagePath) {
          this.user.imagePath = data.imagePath;
        }

        if (data.phone) {
          this.user.phone = data.phone;
        }
      },
      error: (error) => console.log(error),
      complete: () => console.log('done'),
    });
  }

  getWishlist() {
    this.userProfileRequestService.getWishlist().subscribe({
      next: (data) => (this.wishList = data.wishList),
      error: (error) => console.log(error),
      complete: () => console.log(this.wishList),
    });
  }

  removeProductFromWishlist(productId: string, index: number) {
    this.wishList.splice(index, 1);

    this.updataWishList(productId);
  }

  updataWishList(product: string) {
    this.userProfileRequestService
      .updateWishListRequest(product)
      .subscribe((data) => console.log(data));
  }
}
