import { Component, Input, OnInit, Output, input } from '@angular/core';
import { IProduct } from '../../../../modles/product.modle';
import { Router } from '@angular/router';
import { CartRequestService } from '../../../services/cart/cart.request.service';
import { ProductsRequestsService } from '../../../services/product/products-requests.service';
import { ICart } from '../../../../modles/cart.modle';
import { range } from '../../../utils/range';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productRequestServices: ProductsRequestsService,
    private router: Router,
    private cartReqService: CartRequestService
  ) {}

  @Input() cartItem: ICart = {
    product: {
      _id: '',
      title: '',
      description: '',
      price: 0,
      discount: 0,
      stock: 0,
      brand: '',
      category: '',
      thumbnail: '',
      images: [''],
      rating: 0,
      reviews: [''],
      createdAt: '',
      updatedAt: '',
      isDeleted: false,
    },
    quantity: 0,
  };

  clickedButtonIndex: number | null = null;
  products: IProduct[] = [];
  allProducts: IProduct[] = [];
  loading: boolean = false;

  numberOfPages: number;
  pages: any = [];
  pageSize: number = 8;
  pageStartIndex: number;
  selectedPage = 1;

  ngOnInit() {
    // this.loading==false
    this.getProducts();
  }

  sortProductByPrice() {
    console.log(this.allProducts)
    this.allProducts.sort((a, b) => a.price - b.price);
    this.products.sort((a, b) => a.price - b.price);
  }
  getProducts() {
    this.loading = true;

    this.productRequestServices.getAllProductsRequest().subscribe(
      (res: any) => {
        // console.log(res);
        this.allProducts = res;
        this.numberOfPages = Math.ceil(this.allProducts.length / this.pageSize);
        this.pagination(this.selectedPage);
        this.pages = range(this.numberOfPages);
        this.loading = false;
      },
      (err) => {
        alert(err.message);
        this.loading = false;

        console.log(err.message);
      }
    );
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
}
