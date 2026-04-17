import { Component, Input, Inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="card">
      <img [src]="product.imageUrl || 'assets/placeholder.png'" [alt]="product.name">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price | currency }}</p>
      <button (click)="addToCart()" [disabled]="product.stock === 0">Add to Cart</button>
    </div>
  `,
  standalone: true,
  imports: [CurrencyPipe]
})
export class ProductCardComponent {
  @Input() product!: any;
  constructor(@Inject(CartService) private cartService: CartService) {}
  addToCart() { this.cartService.addItem(this.product.id, 1); }
}