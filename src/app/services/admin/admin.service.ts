import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  getDataLength() {
    return this.httpClient.get<any>(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/admin/length'
    );
  }
}
