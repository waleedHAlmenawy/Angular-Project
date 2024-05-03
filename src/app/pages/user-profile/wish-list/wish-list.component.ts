import { Component, Input } from '@angular/core';
import { UserProfileRequestService } from '../../../services/user-profile/user-profile.request.service';
import { IProduct } from '../../../../modles/product.modle';
import { UserProfileService } from '../../../services/user-profile/user-profile.service';
import { error } from 'console';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent {
  constructor(
    private userProfileService: UserProfileService,
    private userProfileRequestService: UserProfileRequestService
  ) {}

  @Input() wishList: IProduct[] = [];

  ngOnInit() {
    if (!this.userProfileService.wishList[0]) {
      this.userProfileRequestService.getWishlist().subscribe({
        next: (data) => this.wishList = data.wishList,
        error: (error) => console.log(error),
        complete: () => {
          this.userProfileService.wishList = this.wishList;
        }
      })
    } else {
      this.wishList = this.userProfileService.wishList;
    }
  }

  onClickRemove() {}

  onClickHeartIcon() {}
}
