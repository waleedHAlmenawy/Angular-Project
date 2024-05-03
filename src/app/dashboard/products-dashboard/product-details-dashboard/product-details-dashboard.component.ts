import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsRequestsService } from '../../../services/product/products-requests.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details-dashboard',
  templateUrl: './product-details-dashboard.component.html',
  styleUrl: './product-details-dashboard.component.css',
})
export class ProductDetailsDashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private productsRequestsService: ProductsRequestsService
  ) {}

  subscription: Subscription;
  product: any;
  thumbnailImage: any;

  ngOnInit() {
    const productId = this.activatedRouter.snapshot.paramMap.get('id');
    this.subscription = this.activatedRouter.params.subscribe({
      next: (data) => this.getProductById(data['id']),
    });
    this.getProductById(productId);
  }

  getProductById(id: any) {
    console.log(id);
    this.productsRequestsService.getProductByIdRequest(id).subscribe((data) => {
      console.log(data);
      this.product = data;
      this.thumbnailImage = this.product.thumbnail;
    });
  }

  changeThumbnailImage(image: any) {
    this.thumbnailImage = image;
  }
}
