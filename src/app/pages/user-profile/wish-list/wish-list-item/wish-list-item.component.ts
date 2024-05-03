import { Component, Input } from '@angular/core';
import { IProduct } from '../../../../../modles/product.modle';
import { UserProfileService } from '../../../../services/user-profile/user-profile.service';
import { UserProfileRequestService } from '../../../../services/user-profile/user-profile.request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.css',
})
export class WishListItemComponent {
  @Input() product: IProduct;

  constructor(
    private userProfileService: UserProfileService,
    private userProfileRequestService: UserProfileRequestService,
    private router: Router
  ) {}

  ngOnInit() {}

  onClickRemove(productId: string) {
    console.log("iii")
    let index = this.userProfileService.wishList.findIndex(
      (product) => product._id == this.product._id
    );

    this.userProfileService.wishList.splice(index, 1);

    this.userProfileRequestService.updateWishListRequest(productId).subscribe();

    this.userProfileService.wishListProductIds = this.userProfileService.wishList.map(
      (product) => product._id
    );
  }

  showDetails(productId: any) {
    this.router.navigate(['/user', 'productDetails', productId]);
  }
}
