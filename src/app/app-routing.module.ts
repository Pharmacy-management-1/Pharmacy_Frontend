import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { CartViewComponent } from './features/cart/cart-view/cart-view.component';
import { CheckoutComponent } from './features/cart/checkout/checkout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProfileDashboardComponent } from './features/auth/profile-dashboard/profile-dashboard.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AdminPanelComponent } from './features/prescriptions/admin-panel/admin-panel.component';
import { UploadComponent } from './features/prescriptions/upload/upload.component';
import { OrderDetailComponent } from './features/orders/order-detail/order-detail.component';
import { OrderHistoryComponent } from './features/orders/order-history/order-history.component';
import { PackageDetailComponent } from './features/health-packages/package-detail/package-detail.component';
import { PackageListComponent } from './features/health-packages/package-list/package-list.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { SeasonalBannerComponent } from './features/offers/seasonal-banner/seasonal-banner.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileDashboardComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'prescriptions', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartViewComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrderHistoryComponent, canActivate: [AuthGuard] },
  { path: 'orders/:id', component: OrderDetailComponent, canActivate: [AuthGuard] },
  { path: 'health-packages', component: PackageListComponent },
  { path: 'health-packages/:id', component: PackageDetailComponent },
  { path: 'offers', component: SeasonalBannerComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
