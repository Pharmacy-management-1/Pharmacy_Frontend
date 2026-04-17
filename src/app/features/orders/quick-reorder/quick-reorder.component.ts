import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuickReorderService, FrequentItem } from '../../../core/services/quick-reorder.service';
import { OrderHistoryService } from '../../../core/services/order-history.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quick-reorder',
  templateUrl: './quick-reorder.component.html',
  styleUrls: ['./quick-reorder.component.css']
})
export class QuickReorderComponent implements OnInit {
  frequentItems: FrequentItem[] = [];
  recentOrders: any[] = [];
  recommendations: any[] = [];
  isLoading = false;

  constructor(
    private quickReorderService: QuickReorderService,
    private orderHistoryService: OrderHistoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadQuickReorderData();
  }

  loadQuickReorderData(): void {
    this.isLoading = true;
    
    // Load frequent items
    this.quickReorderService.getFrequentItems().subscribe({
      next: (items) => {
        this.frequentItems = items;
      },
      error: (error) => console.error('Failed to load frequent items', error)
    });

    // Load recent orders for reorder
    this.orderHistoryService.getUserOrders().subscribe({
      next: (orders) => {
        this.recentOrders = orders.slice(0, 5);
      },
      error: (error) => console.error('Failed to load recent orders', error)
    });

    // Load recommendations
    this.quickReorderService.getReorderRecommendations().subscribe({
      next: (recommendations) => {
        this.recommendations = recommendations;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load recommendations', error);
        this.isLoading = false;
      }
    });
  }

  reorderItem(productId: number): void {
    // Add to cart and checkout
    this.router.navigate(['/products', productId]);
  }

  reorderOrder(orderId: number): void {
    this.quickReorderService.quickReorder(orderId).subscribe({
      next: (response) => {
        this.snackBar.open('Order placed successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/orders', response.orderId]);
      },
      error: (error) => {
        this.snackBar.open('Failed to reorder', 'Close', { duration: 3000 });
      }
    });
  }

  reorderWithModifications(orderId: number): void {
    // Navigate to cart with items from previous order
    this.router.navigate(['/cart'], { queryParams: { reorder: orderId } });
  }
}