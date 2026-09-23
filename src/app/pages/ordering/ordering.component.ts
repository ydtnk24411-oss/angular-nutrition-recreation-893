import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from '../../components/shell/shell.component';
import { CartService } from '../../shared/services/cart.service';
import { onlineOrderProducts } from '../../shared/data/xanh-la.data';
import { XanhLaProduct } from '../../shared/models/xanh-la.models';

@Component({
  selector: 'app-ordering',
  standalone: true,
  imports: [CommonModule, ShellComponent],
  templateUrl: './ordering.component.html',
  styleUrl: './ordering.component.css',
})
export class OrderingComponent {
  protected cart = inject(CartService);
  protected fulfillment = signal<'pickup' | 'delivery'>('pickup');
  protected activeSection = signal('Sản Phẩm Tươi');

  protected sections = [
    { title: 'Sản Phẩm Tươi',    items: onlineOrderProducts.slice(0, 3) },
    { title: 'Rau Cải',          items: onlineOrderProducts.slice(3, 6) },
    { title: 'Thịt và Hải Sản',  items: onlineOrderProducts.slice(6, 9) },
  ];

  scrollTo(title: string): void {
    this.activeSection.set(title);
    document.getElementById(title)?.scrollIntoView({ behavior: 'smooth' });
  }

  addToCart(prod: XanhLaProduct): void { this.cart.addItem(prod, 1); }
}
