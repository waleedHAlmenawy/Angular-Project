import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/product/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailsComponent } from './pages/product/product-details/product-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserFormComponent } from './pages/user-profile/user-form/user-form.component';
import { OrdersComponent } from './pages/order/orders/orders.component';
import { OrderDetailsComponent } from './pages/order/order-details/order-details.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { ProductsDashboardComponent } from './dashboard/products-dashboard/products-dashboard.component';
import { UsersDashboardComponent } from './dashboard/users-dashboard/users-dashboard.component';
import { CategoriesDashboardComponent } from './dashboard/categories-dashboard/categories-dashboard.component';
import { FormEditProductComponent } from './dashboard/products-dashboard/formEditProduct/form-edit-product/form-edit-product.component';
import { AddProductComponent } from './dashboard/products-dashboard/addNewProduct/add-product/add-product.component';
import { AddNewUserComponent } from './dashboard/users-dashboard/add-new-user/add-new-user.component';
import { EditUserComponent } from './dashboard/users-dashboard/edit-user/edit-user.component';
import { OrdersDashboardComponent } from './dashboard/orders-dashboard/orders-dashboard.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { WishListComponent } from './pages/user-profile/wish-list/wish-list.component';
import { AccountComponent } from './pages/user-profile/account/account.component';
import { AdminGuard } from './services/guards/admin-guard.service';
import { OrderDetailsHistoryComponent } from './pages/order/order-details-history/order-details-history.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProductDetailsDashboardComponent } from './dashboard/products-dashboard/product-details-dashboard/product-details-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/home', pathMatch: 'full' },
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },

  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'productDetails/:id', component: ProductDetailsComponent ,
    },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: UserProfileComponent,

        children: [
          {
            path: 'account',
            component: AccountComponent,
            children: [{ path: 'edit', component: UserFormComponent }],
          },
          { path: 'orders', component: OrderDetailsComponent },
          { path: 'orders-history', component: OrderDetailsHistoryComponent },
          { path: 'wish-list', component: WishListComponent },
        ],
      },
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      {
        path: 'contactUs',
        canActivate: [AuthGuard],
        component: ContactUsComponent,
      },
      {
        path: 'checkout',
        component: OrdersComponent,
        canActivate: [AuthGuard],
      },

      { path: 'about', component: AboutComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'homedashboard',
        pathMatch: 'full',
      },
      {
        path: 'homedashboard',
        component: HomeDashboardComponent,
      },
      {
        path: 'products',
        component: ProductsDashboardComponent,
      },
      {
        path: 'users',
        component: UsersDashboardComponent,
      },
      {
        path: 'categories',
        component: CategoriesDashboardComponent,
      },
      {
        path: 'orders',
        component: OrdersDashboardComponent,
      },
      {
        path: 'editProduct/:id',
        component: FormEditProductComponent,
      },
      {
        path: 'addProduct',
        component: AddProductComponent,
      },
      {
        path: 'addUser',
        component: AddNewUserComponent,
      },
      {
        path: 'editUser/:id',
        component: EditUserComponent,
      },
    ],
  },
  {
    path: 'productDtailsDashboard/:id',
    component: ProductDetailsDashboardComponent,
    canActivate: [AdminGuard],
  },
  { path: '**', component: NotFound404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
