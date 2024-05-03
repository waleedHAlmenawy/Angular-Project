import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CartRequestService } from '../../services/cart/cart.request.service';
import { CartService } from '../../services/cart/cart.service';
import { CategoryRequestsService } from '../../services/category/category-requests.service';
import { ICategory } from '../../../modles/category';
import { ProductsRequestsService } from '../../services/product/products-requests.service';
import { Router } from '@angular/router';
import { IProduct } from '../../../modles/product.modle';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  allCategories: ICategory[];
  allProducts: any = [];
  selectedCategory: ICategory | null;
  product: IProduct;
  cartRequest: Observable<any>;

  isClicked: boolean = false;
  next = false;
  prev = false;
  firstIndex = 0;
  secIndex = 0;

  bannerData = [
    {
      img: '../../../assets/banner-images/1.jpg',
      title: 'Unleash Your Creativity: The New MacBook Pro is Here',
      desc: `
      Experience groundbreaking performance with the all-new M2 chip. Tackle demanding workflows
            with ease. Edit videos, render 3D graphics, and code like a pro. The new MacBook Pro is built for those who
            push boundaries.`,
      src: '/user/productDetails/660e45f8e91488689a0a0b01',
    },
    {
      img: '../../../assets/banner-images/2.jpg',
      title:
        'Capture Every Detail: Stunning Photos with the New Nikon Z Series Camera',
      desc: `Experience exceptional clarity and detail with the new Nikon Z Series camera. Its advanced
      image sensor and powerful processor deliver stunning photos and videos, even in low-light conditions.`,
      src: '/user/productDetails/660de75e630d0119506a1e17',
    },
    {
      img: '../../../assets/banner-images/3.jpg',
      title: 'Dive into the Future: Discover Cutting-Edge Tech Products',
      desc: `Tired of the same old tech? We've got a selection of groundbreaking products that will
      transform the way you interact with the world. Discover innovative solutions designed to streamline your
      life, boost productivity, and unlock new possibilities.`,
      src: '/user/productDetails/660de670630d0119506a1dfd',
    },
    {
      img: '../../../assets/banner-images/4.jpg',
      title: 'Immerse Yourself in Sound: Experience the New Boss Headphones',
      desc: `Get lost in the details of your music with the new Boss headphones. Featuring premium
      drivers and advanced noise cancellation, these headphones deliver an exceptional listening experience.`,
      src: '/user/productDetails/660de136d70ff53430145a55',
    },
  ];

  constructor(
    private cartRequestService: CartRequestService,
    private categoryRequestsServices: CategoryRequestsService,
    private productRequestsServices: ProductsRequestsService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.categoryRequestsServices
      .getAllCategoriesRequest()
      .subscribe((data: any) => {
        this.allCategories = data.data;
        this.selectedCategory = this.allCategories[0];
      });
    this.getAllProducts();

    this.getProductsByCategory(this.allCategories[0])

    if (this.cartService.productIds.includes(this.allProducts._id)) {
      this.isClicked = true;
    }
  }

  toggleCart(productId: string) {
    if (this.isClicked) {
      let index = this.cartService.cartItems.findIndex(
        (cart) => cart.product._id == this.allProducts._id
      );

      this.cartService.cartItems.splice(index, 1);

      this.cartRequest = this.cartRequestService.removeCartRequest(productId);

      this.isClicked = false;
    } else {
      this.cartService.cartItems.push({
        product: this.allProducts,
        quantity: 1,
      });

      this.cartRequest = this.cartRequestService.addToCart(productId);

      this.isClicked = true;
    }

    this.cartRequest.subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
    });

    this.cartService.productIds = this.cartService.cartItems.map(
      (cart) => cart.product._id
    );
  }

  getProductsByCategory(category: ICategory) {
    console.log(category);
    this.selectedCategory = category;
    console.log(this.selectedCategory);
    this.categoryRequestsServices
      .getProductsByCategoryRequest(category)
      .subscribe((data) => {
        this.allProducts = data;
        console.log(this.allProducts);
        console.log(data);
      });
  }

  getAllProducts() {
    this.productRequestsServices
      .getAllProductsRequest()
      .subscribe((data: any) => {
        this.allProducts = data;
      });
  }

  // addProductToCart(product: IProduct) {
  //   this.cartService.cartItems.push({
  //     product: product,
  //     quantity: 1,
  //   });
  //   this.cartRequestService.addToCart(product._id).subscribe({
  //     next: (data) => console.log(data),
  //     error: (error) => console.log(error),
  //   });
  // }

  showDetails(productId: any) {
    this.router.navigate(['/user', 'productDetails', productId]);
  }

  onClickNext() {
    this.next = !this.next;

    this.secIndex = this.firstIndex + 1;

    if (this.secIndex == 4) {
      this.secIndex = 0;
    }

    setTimeout(() => {
      this.next = false;

      this.firstIndex = this.secIndex;
    }, 1000);
  }

  onClickPrev() {
    this.prev = !this.prev;

    this.secIndex = this.firstIndex - 1;

    if (this.secIndex == -1) {
      this.secIndex = 3;
    }

    setTimeout(() => {
      this.prev = false;

      this.firstIndex = this.secIndex;
    }, 1000);
  }
}
