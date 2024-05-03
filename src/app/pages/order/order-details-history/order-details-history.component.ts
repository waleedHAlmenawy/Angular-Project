import { Component } from '@angular/core';
import { Order } from '../../../../modles/order.modle';
import { OrdersService } from '../../../services/order/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details-history',
  templateUrl: './order-details-history.component.html',
  styleUrl: './order-details-history.component.css',
})
export class OrderDetailsHistoryComponent {
  orders: Order[] = [];
  orderId: any;
  status: any;

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.orderService.getOrdersUser().subscribe((data) => {
      data = data.filter(
        (order) => order.status == 'Accepted' || order.status == 'Canceled'
      );
      this.orders = data;
      console.log(data);
    });
  }
}
