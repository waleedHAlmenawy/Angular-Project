import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddReivew, Review, UpdateReview } from '../../../modles/review.modle';
@Injectable({
  providedIn: 'root',
})
export class ProductReviewService {
  constructor(private http: HttpClient) {}

  getreviewsById(productId: string) {
    return this.http.get<Review[]>(
      `http://localhost:3010/api/v1/products/${productId}/reviews`
    );
  }
  //
  removeDelete(productId: string) {
    return this.http.delete<Review[]>(
      `http://localhost:3010/api/v1/products/${productId}/reviews`
    );
  }
  //
  addNewReview(productId: string, reviews: AddReivew) {
    return this.http.post<Review[]>(
      `http://localhost:3010/api/v1/products/${productId}/reviews`,
      reviews
    );
  }
  updateReview(productId:string ,  reviews:UpdateReview){
    return this.http.patch<Review[]>(`http://localhost:3010/api/v1/products/${productId}/reviews`,reviews)
  }
  //
  isReviewd(productId: string) {
    return this.http.get<any>(
      `http://localhost:3010/api/v1/products/${productId}/reviews/user`
    );
  }
}
// 65f65b6cbc8b5a64c143026c
