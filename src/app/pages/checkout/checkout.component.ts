import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShellComponent } from '../../components/shell/shell.component';
import { CartService, formatPrice } from '../../shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ShellComponent, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  protected cart = inject(CartService);
  private router = inject(Router);
  protected formatPrice = formatPrice;

  protected completed = signal(false);
  protected orderCode = signal('');
  protected shippingMethod = signal<'pickup' | 'delivery'>('pickup');

  handleSubmit(e: Event): void {
    e.preventDefault();
    const code = 'XL-' + Math.floor(100000 + Math.random() * 900000);
    this.orderCode.set(code);
    this.completed.set(true);
    this.cart.clear();
  }
}
