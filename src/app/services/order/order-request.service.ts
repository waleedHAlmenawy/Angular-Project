import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderRequestService {
  constructor(private httpClient: HttpClient) {}

  getAllOrders() {
    return this.httpClient.get(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/orders'
    );
  }

  updateOrderStatus(id: string, data: any) {
    return this.httpClient.patch(
      `https://e-commerce-nodejs-dj4i.onrender.com/api/v1/orders/${id}`,
      data
    );
  }

  createOrder(body: any) {
    return this.httpClient.post(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/orders',
      body
    );
  }

  checkoutSession(orderId: string) {
    return this.httpClient.post(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/stripe/create-checkout-session',
      { orderId }
    );
  }
}
