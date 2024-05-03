import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderRequestService } from '../../../services/order/order-request.service';
import { phoneNumberRegex } from '../../../regex/phone';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  constructor(
    private router: Router,
    private orderRequestService: OrderRequestService
  ) {}

  isSubmitted: boolean = false;
  UserForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]{3,20}'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]{3,20}'),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(phoneNumberRegex),
    ]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    address: new FormControl('', [Validators.required]),
    zip: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]),
  });

  orderId: string;

  OnSumbit() {
    this.isSubmitted = true;

    if (this.UserForm.invalid) {
      console.log('invalid');
      return;
    }

    this.orderRequestService
      .createOrder({
        fName: this.UserForm.value.firstName,
        lName: this.UserForm.value.lastName,
        shippingAddress: this.UserForm.value.address,
        state: this.UserForm.value.state,
        city: this.UserForm.value.city,
        phone: this.UserForm.value.phoneNumber,
        zip: this.UserForm.value.zip,
      })
      .subscribe({
        next: (data: any) => this.orderId = data._id,
        error: (error) => console.log(error),
        complete: () => {
          this.orderRequestService.checkoutSession(this.orderId).subscribe({
            next: (stripe: any) => {
              window.location.href = stripe.url;
            }
          })
        },
      });

    // this.router.navigateByUrl('orderDetails');
  }
}
