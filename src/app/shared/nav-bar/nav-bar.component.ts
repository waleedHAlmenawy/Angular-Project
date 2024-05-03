import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {
  BehaviorSubject,
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  last,
  map,
  of,
  startWith,
  switchMap,
  takeLast,
  takeUntil,
} from 'rxjs';
import { IProduct } from '../../../modles/product.modle';
import { createHttpObservable } from '../../utils/createHttpObservable';
import { CartRequestService } from '../../services/cart/cart.request.service';
import { CartService } from '../../services/cart/cart.service';
import { ProductsRequestsService } from '../../services/product/products-requests.service';
import { UserProfileRequestService } from '../../services/user-profile/user-profile.request.service';
import { UserProfileService } from '../../services/user-profile/user-profile.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class NavBarComponent implements OnInit, AfterViewInit {
  active: boolean = false;
  isAuth: boolean = false;
  role: string = '';
  products$: any;
  @ViewChild('searchInput', { static: true }) input: ElementRef;

  searchProducts: IProduct[];

  constructor(
    private authService: AuthService,
    private cartRequestService: CartRequestService,
    public cartService: CartService,
    private productsRequestsService: ProductsRequestsService,
    private userProfileService: UserProfileService,
    private userProfileRequestService: UserProfileRequestService,
    private _eref: ElementRef
  ) {
    this.authService.isAuthenticated();
    this.authService.isAuth.subscribe({
      next: (val) => (this.isAuth = val),
      error: (error) => console.log(error),
    });
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('token')) {
        this.role = this.authService.role();

        this.cartRequestService.getUserCartRequest().subscribe({
          next: (carts) => (this.cartService.cartItems = carts),
          error: (error) => console.log(error),
          complete: () => {
            this.cartService.productIds = this.cartService.cartItems.map(
              (cart) => cart.product._id
            );
          },
        });

        this.userProfileRequestService.getWishlist().subscribe({
          next: (data) => (this.userProfileService.wishList = data.wishList),
          error: (error) => console.log(error),
          complete: () => {
            this.userProfileService.wishListProductIds =
              this.userProfileService.wishList.map((product) => product._id);
          },
        });

        this.userProfileRequestService.getUserDataRequest().subscribe({
          next: (data) => (this.userProfileService.user = data),
          error: (error) => console.log(error),
        });
      }
    }
  }

  ngAfterViewInit() {
    this.products$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map((event) => {
          console.log(event.target.value);
          return event.target.value;
        }),
        startWith(''), // to send initial request
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((search) => this.loadProducts(search))
      )
      .subscribe();
  }

  loadProducts(search: string): Observable<any> {
    if (search) {
      return createHttpObservable(
        `https://e-commerce-nodejs-dj4i.onrender.com/api/v1/products/search/product/${search}`
      ).pipe(
        map((res) => {
          res.length = res.length > 4 ? 4 : res.length;
          this.searchProducts = res;
          return res['payload'];
        })
      );
    } else {
      this.searchProducts = [];
      return this.productsRequestsService.getAllProductsRequest();
    }
  }

  onClick(e: any) {
    if (!this._eref.nativeElement.contains(e.target)) {
      this.searchProducts = [];
    }
  }
}
