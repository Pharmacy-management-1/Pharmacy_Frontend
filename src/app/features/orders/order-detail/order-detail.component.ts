import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderHistoryService, OrderDetail } from '../../../core/services/order-history.service';
import { QuickReorderService } from '../../../core/services/quick-reorder.service';
import { EmailService } from '../../../core/services/email.service';
import { environment } from 'src/app/environments/environment.prod';

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
        this.isLoading = false;
        this.router.navigate(['/orders']);
      }
    });
  }

  cancelOrder(): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderHistoryService.cancelOrder(this.orderId).subscribe({
        next: () => {
          this.loadOrderDetails();
        },
        error: (error) => {
        }
      });
    }
  }

  quickReorder(): void {
    this.quickReorderService.quickReorder(this.orderId).subscribe({
      next: (response) => {
        this.router.navigate(['/orders', response.orderId]);
      },
      error: (error) => {
      }
    });
  }

  resendConfirmation(): void {
    this.emailService.resendOrderConfirmation(this.orderId).subscribe({
      next: () => {
      },
      error: (error) => {
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