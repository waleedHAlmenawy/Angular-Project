import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth, ILogin, IRegister } from '../../../modles/auth.modle';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlobOptions } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  userAuth: IAuth = {
    token: '',
    message: '',
    role: '',
  };

  isAuth = new BehaviorSubject(false);

  createNewUserRequest(user: IRegister, image: File) {
    const userData = new FormData();

    userData.append('name', user.name);
    userData.append('email', user.email);
    userData.append('password', user.password);
    userData.append('phone', `${user.phone}`);
    userData.append('image', image);

    return this.httpClient.post(
      'http://localhost:3010/api/v1/users/register',
      userData
    );
  }

  loginRequest(user: ILogin): Observable<IAuth> {
    return this.httpClient.post<IAuth>(
      'http://localhost:3010/api/v1/users/login',
      user
    );
  }

  isAuthenticated(): any {
    if (typeof window !== 'undefined') {
      this.isAuth.next(localStorage.getItem('token') ? true : false);
      return localStorage.getItem('token') ? true : false;
    }
  }

  role(): any {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('role') ?? '';
    }
  }
}
