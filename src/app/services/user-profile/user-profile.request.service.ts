import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IEditProfile,
  IProfile,
  IWishlist,
} from '../../../modles/profile.modle';

@Injectable({
  providedIn: 'root',
})
export class UserProfileRequestService {
  constructor(private http: HttpClient) {}

  getUserDataRequest(): Observable<IProfile> {
    return this.http.get<IProfile>(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/profile'
    );
  }

  patchUserRequest(updatedProfileData: IEditProfile): Observable<any> {
    return this.http.patch<any>(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/profile',
      updatedProfileData
    );
  }

  getWishlist(): Observable<IWishlist> {
    return this.http.get<IWishlist>(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/profile/wish-list'
    );
  }

  updateWishListRequest(product: string) {
    return this.http.post<string>(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/profile/wish-list',
      { product }
    );
  }
}
