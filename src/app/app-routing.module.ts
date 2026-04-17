import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

// Member D Components
import { OrderHistoryComponent } from './features/orders/order-history/order-history.component';
import { OrderDetailComponent } from './features/orders/order-detail/order-detail.component';
import { QuickReorderComponent } from './features/orders/quick-reorder/quick-reorder.component';
import { PackageListComponent } from './features/health-packages/package-list/package-list.component';
import { PackageDetailComponent } from './features/health-packages/package-detail/package-detail.component';

const routes: Routes = [
  // Existing routes...
  
  // Member D Routes
  {
    path: 'orders',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: OrderHistoryComponent },
      { path: 'quick-reorder', component: QuickReorderComponent },
      { path: ':id', component: OrderDetailComponent }
    ]
  },
  {
    path: 'health-packages',
    children: [
      { path: '', component: PackageListComponent },
      { path: ':id', component: PackageDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }