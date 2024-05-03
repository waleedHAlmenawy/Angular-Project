import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../../../modles/order.modle';
import { OrdersService } from '../../../services/order/orders.service';
import { ActivatedRoute } from '@angular/router';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { PopUpService } from '../../../services/pop-up/pop-up.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  orders: Order[] = [];

  orderId: any;
  status: any;
  faX = faX;

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private popUpService: PopUpService
  ) {}

  subscription$: Subscription = new Subscription();
  ngOnInit(): void {
    this.subscription$.add(
      this.orderService.getOrdersUser().subscribe((data) => {
        data = data.filter((order) => order.status === 'Pending');
        this.orders = data;
        console.log(data);
      })
    );
  } //oninit

  onCancelOrder(orderId: string, status: string) {
    this.popUpService
      .openDialog('Do you want to cancel this order ?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.orderService.cancelOrder(orderId, status).subscribe({
            next: (res) => {
              const cancelOrderIndex = this.orders.findIndex(
                (order) => order._id === orderId
              ); //
              this.orders.splice(cancelOrderIndex, 1);
            },
            error: (err) => {
              console.log('error', err);
            },
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
