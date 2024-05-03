import { Injectable } from '@angular/core';
import { Order } from '../../../modles/order.modle';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}
  getOrdersUser() {
    return this.http.get<Order[]>(
      'https://e-commerce-nodejs-dj4i.onrender.com/api/v1/orders/user'
    );
  }
  cancelOrder(orderId: string, newStatus: string) {
    const newBody = { status: newStatus };
    return this.http.patch<Order>(
      `https://e-commerce-nodejs-dj4i.onrender.com/api/v1/orders/${orderId}/cancel`,
      newBody
    );
  }
}
