import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderHistoryService, OrderDetail } from '../../../core/services/order-history.service';
import { QuickReorderService } from '../../../core/services/quick-reorder.service';
import { EmailService } from '../../../core/services/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: OrderDetail | null = null;
  isLoading = false;
  orderId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderHistoryService: OrderHistoryService,
    private quickReorderService: QuickReorderService,
    private emailService: EmailService,
    private snackBar: MatSnackBar
  ) {
    this.orderId = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadOrderDetails();
  }

  loadOrderDetails(): void {
    this.isLoading = true;
    this.orderHistoryService.getOrderDetails(this.orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Failed to load order details', 'Close', { duration: 3000 });
        this.isLoading = false;
        this.router.navigate(['/orders']);
      }
    });
  }

  cancelOrder(): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderHistoryService.cancelOrder(this.orderId).subscribe({
        next: () => {
          this.snackBar.open('Order cancelled successfully', 'Close', { duration: 3000 });
          this.loadOrderDetails();
        },
        error: (error) => {
          this.snackBar.open('Failed to cancel order', 'Close', { duration: 3000 });
        }
      });
    }
  }

  quickReorder(): void {
    this.quickReorderService.quickReorder(this.orderId).subscribe({
      next: (response) => {
        this.snackBar.open('Order placed successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/orders', response.orderId]);
      },
      error: (error) => {
        this.snackBar.open('Failed to reorder', 'Close', { duration: 3000 });
      }
    });
  }

  resendConfirmation(): void {
    this.emailService.resendOrderConfirmation(this.orderId).subscribe({
      next: () => {
        this.snackBar.open('Confirmation email sent successfully', 'Close', { duration: 3000 });
      },
      error: (error) => {
        this.snackBar.open('Failed to send email', 'Close', { duration: 3000 });
      }
    });
  }

  downloadInvoice(): void {
    // Implement invoice download
    window.open(`${environment.apiUrl}/orders/${this.orderId}/invoice`, '_blank');
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'pending': '⏳',
      'confirmed': '✅',
      'processing': '⚙️',
      'shipped': '🚚',
      'delivered': '📦',
      'cancelled': '❌'
    };
    return icons[status.toLowerCase()] || '📋';
  }
}