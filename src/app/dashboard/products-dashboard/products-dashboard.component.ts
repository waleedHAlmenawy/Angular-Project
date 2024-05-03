import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IProduct } from '../../../modles/product.modle';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './addNewProduct/add-product/add-product.component';
import { ProductsRequestsService } from '../../services/product/products-requests.service';
import { range } from '../../utils/range';
import { FormEditProductComponent } from './formEditProduct/form-edit-product/form-edit-product.component';
import { Observable, fromEvent, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { createHttpObservable } from '../../utils/createHttpObservable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrl: './products-dashboard.component.css',
})
export class ProductsDashboardComponent implements OnInit, AfterViewInit {
  products$: any;

  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(
    private productRequestsServices: ProductsRequestsService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  allProducts: any;
  product: IProduct;
  products: any = [];

  isLoading: boolean = false;
  numberOfPages: number;
  pages: any = [];
  pageSize: number = 8;
  pageStartIndex: number;
  selectedPage = 1;

  ngOnInit() {
    this.isLoading = true;
    this.productRequestsServices
      .getAllProductsRequest()
      .subscribe((data: any) => {
        this.isLoading = false;
        this.allProducts = data;
        this.numberOfPages = Math.ceil(this.allProducts.length / this.pageSize);
        this.pagination(this.selectedPage);
        this.pages = range(this.numberOfPages);
      });
  }

  ngAfterViewInit() {
    this.products$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map((event) => {
          console.log(event.target.value);
          return event.target.value;
        }),
        startWith(''),
        debounceTime(500),
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
          console.log(res);
          this.selectedPage = 1;
          this.allProducts = res;
          this.numberOfPages = Math.ceil(
            this.allProducts.length / this.pageSize
          );
          this.pagination(this.selectedPage);
          this.pages = range(this.numberOfPages);
          console.log(this.products);
          return res['payload'];
        })
      );
    } else {
      this.productRequestsServices
        .getAllProductsRequest()
        .subscribe((data: any) => {
          console.log(data);
          this.allProducts = data;
          this.numberOfPages = Math.ceil(
            this.allProducts.length / this.pageSize
          );
          this.pagination(this.selectedPage);
          this.pages = range(this.numberOfPages);
        });
      console.log(this.products);
      return this.products;
    }
  }

  pagination(selectedPage: number) {
    const pageStartIndex = this.pageSize * (selectedPage - 1);
    this.products = this.allProducts.slice(
      pageStartIndex,
      pageStartIndex + this.pageSize
    );
    console.log(this.products);
  }

  nextPage(currentPagePage: number) {
    console.log(currentPagePage);
    this.selectedPage = currentPagePage + 1;
    this.pagination(this.selectedPage);
  }

  prevPage(currentPage: number) {
    console.log(currentPage);
    this.selectedPage = currentPage - 1;
    this.pagination(this.selectedPage);
  }

  openAddProductPopup() {
    this.dialog.open(AddProductComponent);
  }

  openEditProductPopup(product: IProduct) {
    this.dialog.open(FormEditProductComponent, {
      data: { productId: product._id },
    });
  }

  deleteProduct(product: IProduct) {
    product.isDeleted = true;
    console.log(product.isDeleted);

    console.log(product);
    this.productRequestsServices
      .updateProductDataRequest({ isDeleted: product.isDeleted }, product._id)
      .subscribe((data) => {
        console.log(data);
      });
  }

  gotoProductDetails(productId: string) {
    this.router.navigate(['/productDtailsDashboard', productId]);
  }
}
