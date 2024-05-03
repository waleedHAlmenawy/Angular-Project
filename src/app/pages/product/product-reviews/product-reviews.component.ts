import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductReviewService } from '../../../services/reviews/product-review.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../../../modles/review.modle';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css',
})
export class ProductReviewsComponent implements OnInit, OnDestroy {
  //icon
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  //icon
  //counter

  //
  reviews: Review[];

  reviewForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
  });

  isReviewed = {
    isReviewed: false,
    reviewId: '',
  };

  isUpdated = false;

  constructor(
    private authService: AuthService,
    private productReviewService: ProductReviewService,
    private activeRoute: ActivatedRoute
  ) {}

  subscription$: Subscription = new Subscription();

  ngOnInit(): void {
    const productId = this.activeRoute.snapshot.paramMap.get('id');
    if (productId !== null) {
      this.subscription$.add(
        this.productReviewService
          .getreviewsById(productId)
          .subscribe((data: any) => {
            this.reviews = data;
          })
      );

      if (this.authService.isAuthenticated()) {
        this.productReviewService.isReviewd(productId).subscribe({
          next: (data) => (this.isReviewed = data),
          complete: () => console.log(this.isReviewed),
        });

        console.log(this.isReviewed, 'kkkkkkkkkkkkkkk');
      } else {
        this.isReviewed.isReviewed = true;
      }
    } else {
      console.error('Product ID is null');
    }
  }
  //**counter to icon like **//

  iconReviews = [
    {
      count: 0,
      countTwo: 0,
    },
  ];

  increaeCount(index: number) {
    this.iconReviews[index].count++;
    console.log(this.iconReviews[index].count);
  }
  //

  descreaseCount(index: number) {
    this.iconReviews[index].countTwo++;
    console.log(this.iconReviews[index].countTwo);
  }
  //**counter to icon like **//
  //delete//
  onRemoveReview(userId: string, productId: string) {
    this.reviews = this.reviews.filter((review) => review.user._id !== userId);

    this.isReviewed = {
      isReviewed: false,
      reviewId: '',
    };

    this.productReviewService.removeDelete(productId).subscribe();
  }
  ///// add
  addNewReview() {
    const reviewData = {
      title: this.reviewForm.value.title!,
      comment: this.reviewForm.value.comment!,
    };

    const productId = this.activeRoute.snapshot.paramMap.get('id');

    if (productId !== null) {
      this.productReviewService
        .addNewReview(productId, reviewData)
        .subscribe((data: any) => {
          this.reviews.push(data);

          this.isReviewed = {
            isReviewed: true,
            reviewId: data._id,
          };
        });
    }
  }
  // idReview :string
  showForm: boolean = false;
  updateReview() {
    const productId = this.activeRoute.snapshot.paramMap.get('id');
    const reviewData = {
      title: this.reviewForm.value.title!,
      comment: this.reviewForm.value.comment!,
    };

    if (productId !== null) {
      this.productReviewService
        .updateReview(productId, reviewData)
        .subscribe((updatedData: any) => {
          const reviewIndex = this.reviews.findIndex(
            (review) => review._id === updatedData._id
          );
          this.reviews[reviewIndex] = updatedData;
          this.isUpdated = true;
        });
    }
  }
  show() {
    console.log('hhhh');

    this.showForm = !this.showForm;
  }

  //******/
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
