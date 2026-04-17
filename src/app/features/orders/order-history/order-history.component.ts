import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderHistoryService, OrderHistoryItem } from '../../../core/services/order-history.service';
import { QuickReorderService } from '../../../core/services/quick-reorder.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: OrderHistoryItem[] = [];
  filteredOrders: OrderHistoryItem[] = [];
  isLoading = false;
  selectedFilter = 'all';
  
  filters = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  constructor(
    private orderHistoryService: OrderHistoryService,
    private quickReorderService: QuickReorderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderHistoryService.getUserOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Failed to load orders', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    if (this.selectedFilter === 'all') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => 
        order.status.toLowerCase() === this.selectedFilter
      );
    }
  }

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  viewOrderDetails(orderId: number): void {
    this.router.navigate(['/orders', orderId]);
  }

  cancelOrder(orderId: number): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderHistoryService.cancelOrder(orderId).subscribe({
        next: () => {
          this.snackBar.open('Order cancelled successfully', 'Close', { duration: 3000 });
          this.loadOrders();
        },
        error: (error) => {
          this.snackBar.open('Failed to cancel order', 'Close', { duration: 3000 });
        }
      });
    }
  }

  quickReorder(orderId: number): void {
    this.quickReorderService.quickReorder(orderId).subscribe({
      next: (response) => {
        this.snackBar.open('Order placed successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/orders', response.orderId]);
      },
      error: (error) => {
        this.snackBar.open(error.error?.message || 'Failed to reorder. Please check stock availability.', 'Close', { duration: 3000 });
      }
    });
  }

  getStatusColor(status: string): string {
    const statusColors: { [key: string]: string } = {
      'pending': 'warning',
      'confirmed': 'info',
      'processing': 'primary',
      'shipped': 'primary',
      'delivered': 'success',
      'cancelled': 'danger'
    };
    return statusColors[status.toLowerCase()] || 'default';
  }

  trackOrder(orderId: number): void {
    this.router.navigate(['/orders', orderId, 'track']);
  }
}