import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { IProduct } from '../../../../modles/product.modle';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsRequestsService } from '../../../services/product/products-requests.service';
import { Observable, Subscription } from 'rxjs';
import { ICart } from '../../../../modles/cart.modle';
import { CartService } from '../../../services/cart/cart.service';
import { CartRequestService } from '../../../services/cart/cart.request.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productDetails: any = {};
  loading: boolean = false;
  buttonShow: boolean = false;
  subscription: Subscription;
  isClicked: boolean = false;

  cartItem: any = {
    product: this.productDetails,
    quantity: 1,
  };

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private cartRequestService: CartRequestService,
    private productsRequestsService: ProductsRequestsService
  ) {
    this.subscription = this.activatedRouter.params.subscribe({
      next: (data) => {
        this.getProductById(data['id']);
      },
    });
  }

  ngOnInit(): void {
    this.loading = true;

    if(this.cartService.cartItems.includes(this.productDetails._id)){
      this.cartItem.quantity+=1
    }

    this.subscription = this.activatedRouter.params.subscribe({
      next: (data) => this.getProductById(data['id']),
    });

    const productId = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(productId);

    this.getProductById(productId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProductById(id: any) {
    this.loading = true;
    this.productsRequestsService.getProductByIdRequest(id).subscribe(
      (res: any) => {
        this.productDetails = res;
        this.loading = false;
        this.cartItem = {
          product: res,
          quantity: 1,
        };
      },
      (err) => {
        this.loading = true;
        alert(err.message);
      }
    );
  }

  showButton(id: any) {
    this.buttonShow = true;
  }

  hideButton(id: any) {
    this.buttonShow = false;
  }

  addProductToCart(productId: any) {
    this.isClicked = true;
    console.log(this.cartService.cartItems);

    if (this.cartService.productIds.includes(productId)) {
      const quan = this.cartService.cartItems.filter(
        (prd) => prd.product._id == productId
      );
      quan[0].quantity += this.cartItem.quantity;

      return;
    }

    this.cartService.cartItems.push(this.cartItem);

    this.cartRequestService
      .addToCart(this.productDetails._id, this.cartItem.quantity)
      .subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error),
      });
  }
}
