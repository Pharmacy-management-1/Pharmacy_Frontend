import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { CategoryFilterComponent } from './features/products/category-filter/category-filter.component';
import { SearchBarComponent } from './features/products/search-bar/search-bar.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { PrescriptionUploadComponent } from './shared/components/prescription-upload/prescription-upload.component';
import { UploadComponent } from './features/prescriptions/upload/upload.component';
import { AdminPanelComponent } from './features/prescriptions/admin-panel/admin-panel.component';
import { CartViewComponent } from './features/cart/cart-view/cart-view.component';
import { CheckoutComponent } from './features/cart/checkout/checkout.component';
import { OfferBannerComponent } from './shared/components/offer-banner/offer-banner.component';
import { OrderHistoryComponent } from './features/orders/order-history/order-history.component';
import { OrderDetailComponent } from './features/orders/order-detail/order-detail.component';
import { QuickReorderComponent } from './features/orders/quick-reorder/quick-reorder.component';
import { PackageListComponent } from './features/health-packages/package-list/package-list.component';
import { PackageDetailComponent } from './features/health-packages/package-detail/package-detail.component';
import { SeasonalBannerComponent } from './features/offers/seasonal-banner/seasonal-banner.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProfileDashboardComponent } from './features/auth/profile-dashboard/profile-dashboard.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    CategoryFilterComponent,
    SearchBarComponent,
    FilterPipe,
    PrescriptionUploadComponent,
    UploadComponent,
    AdminPanelComponent,
    CartViewComponent,
    CheckoutComponent,
    OfferBannerComponent,
    OrderHistoryComponent,
    OrderDetailComponent,
    QuickReorderComponent,
    PackageListComponent,
    PackageDetailComponent,
    SeasonalBannerComponent,
    LoginComponent,
    RegisterComponent,
    ProfileDashboardComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ProductCardComponent
  ],
   providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
