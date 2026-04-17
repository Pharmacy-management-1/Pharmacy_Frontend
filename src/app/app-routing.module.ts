import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Member D Components
import { OrderHistoryComponent } from './features/orders/order-history/order-history.component';
import { OrderDetailComponent } from './features/orders/order-detail/order-detail.component';
import { QuickReorderComponent } from './features/orders/quick-reorder/quick-reorder.component';
import { PackageListComponent } from './features/health-packages/package-list/package-list.component';
import { PackageDetailComponent } from './features/health-packages/package-detail/package-detail.component';

const routes: Routes = [
  // Default route (important)
  { path: '', redirectTo: 'orders', pathMatch: 'full' },

  // Member D Routes
  {
    path: 'orders',
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
  },

  // Wildcard route (VERY IMPORTANT)
  { path: '**', redirectTo: 'orders' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}