import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (typeof window !== 'undefined') {
      console.log(localStorage.getItem('token'))
      req = req.clone({
        setHeaders: {
          jwt: localStorage.getItem('token') ?? '',
        },
      });
    }

    return next.handle(req);
  }
}
