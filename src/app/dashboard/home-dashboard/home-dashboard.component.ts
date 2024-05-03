import { Component, OnInit } from '@angular/core';
import { ProductsRequestsService } from '../../services/product/products-requests.service';
import { IProduct } from '../../../modles/product.modle';
import { MatDialog } from '@angular/material/dialog';
import { FormEditProductComponent } from '../products-dashboard/formEditProduct/form-edit-product/form-edit-product.component';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css',
})
export class HomeDashboardComponent implements OnInit {
  allProducts: any;

  isLoading: boolean = false;
  dataLength: any;
  priceAfterDiscount: any = [];

  constructor(
    private productRequestsServices: ProductsRequestsService,
    private adminServices: AdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.adminServices.getDataLength().subscribe((data) => {
      this.dataLength = data;
    });

    this.productRequestsServices
      .getAllProductsRequest()
      .subscribe((data: any) => {
        console.log(data);
        this.allProducts = data;
        console.log(this.allProducts);
        this.isLoading = false;
      });
  }

  openEditProductPopup(product: IProduct) {
    this.dialog.open(FormEditProductComponent, {
      data: { productId: product._id },
    });
  }
}
