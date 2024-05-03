import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ProductsComponent } from './pages/product/products/products.component';
import { ProductDetailsComponent } from './pages/product/product-details/product-details.component';
import { OrdersComponent } from './pages/order/orders/orders.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderDetailsComponent } from './pages/order/order-details/order-details.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartItemComponent } from './pages/cart/cart-item/cart-item.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';
import { UsersDashboardComponent } from './dashboard/users-dashboard/users-dashboard.component';
import { ProductsDashboardComponent } from './dashboard/products-dashboard/products-dashboard.component';
import { FormEditProductComponent } from './dashboard/products-dashboard/formEditProduct/form-edit-product/form-edit-product.component';
import { AddProductComponent } from './dashboard/products-dashboard/addNewProduct/add-product/add-product.component';
import { AddNewUserComponent } from './dashboard/users-dashboard/add-new-user/add-new-user.component';
import { EditUserComponent } from './dashboard/users-dashboard/edit-user/edit-user.component';
import { UserFormComponent } from './pages/user-profile/user-form/user-form.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ProductCardComponent } from './pages/product/product-card/product-card.component';
import { AccountComponent } from './pages/user-profile/account/account.component';
import { WishListComponent } from './pages/user-profile/wish-list/wish-list.component';
import { QuantityComponent } from './shared/elements/quantity/quantity.component';
import { SliderComponent } from './shared/elements/slider/slider.component';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { CategoriesDashboardComponent } from './dashboard/categories-dashboard/categories-dashboard.component';
import { OrdersDashboardComponent } from './dashboard/orders-dashboard/orders-dashboard.component';
import { PopUpComponent } from './pages/order/pop-up/pop-up.component';
import { ProductReviewsComponent } from './pages/product/product-reviews/product-reviews.component';
import { AddNewCategoryComponent } from './dashboard/categories-dashboard/add-new-category/add-new-category.component';
import { EditCategoryComponent } from './dashboard/categories-dashboard/edit-category/edit-category.component';
import {MatIconModule} from '@angular/material/icon';
import { WishListItemComponent } from './pages/user-profile/wish-list/wish-list-item/wish-list-item.component';
import { DropMenuComponent } from './shared/nav-bar/drop-menu/drop-menu.component';
import { OrderDetailsHistoryComponent } from './pages/order/order-details-history/order-details-history.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UpComponent } from './up/up.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { SuccessPopUpComponent } from './shared/success-pop-up/success-pop-up.component';
import { PopUpErrorComponent } from './shared/pop-up-error/pop-up-error.component';
import { ProductDetailsDashboardComponent } from './dashboard/products-dashboard/product-details-dashboard/product-details-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    UserProfileComponent,
    ProductsComponent,
    ProductDetailsComponent,
    OrdersComponent,
    AboutComponent,
    ContactUsComponent,
    DashboardComponent,
    OrderDetailsComponent,
    NavBarComponent,
    FooterComponent,
    CartComponent,
    CartItemComponent,
    UserFormComponent,
    HomeComponent,
    NotFound404Component,
    SideBarComponent,
    HomeDashboardComponent,
    UsersDashboardComponent,
    ProductsDashboardComponent,
    CategoriesDashboardComponent,
    FormEditProductComponent,
    AddProductComponent,
    AddNewUserComponent,
    EditUserComponent,
    LoaderComponent,
    OrdersDashboardComponent,
    ProductCardComponent,
    AccountComponent,
    WishListComponent,
    QuantityComponent,
    SliderComponent,
    PopUpComponent,
    ProductReviewsComponent,
    AddNewCategoryComponent,
    EditCategoryComponent,
    WishListItemComponent,
    DropMenuComponent,
    OrderDetailsHistoryComponent,
    UpComponent,
    UserComponent,
    AdminComponent,
    SuccessPopUpComponent,
    PopUpErrorComponent,
    ProductDetailsDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    NgxSkeletonLoaderModule,
    MatIconModule
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
