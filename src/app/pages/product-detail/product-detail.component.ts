import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShellComponent } from '../../components/shell/shell.component';
import { CartService } from '../../shared/services/cart.service';
import { productBySlug } from '../../shared/data/xanh-la.data';
import { XanhLaProduct } from '../../shared/models/xanh-la.models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ShellComponent, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  protected cart = inject(CartService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected product = signal<XanhLaProduct | null>(null);
  protected quantity = signal(1);
  protected selectedRipeness = signal('Ready to Eat');
  protected openAccordions = signal({ info: true, refund: false, shipping: false });

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const prod = productBySlug[slug] ?? productBySlug['/' + slug] ?? productBySlug['/product-page/' + slug];
    this.product.set(prod ?? null);
  }

  dec(): void { this.quantity.update(q => Math.max(1, q - 1)); }
  inc(): void { this.quantity.update(q => q + 1); }
  toggleAccordion(k: 'info' | 'refund' | 'shipping'): void {
    this.openAccordions.update(o => ({ ...o, [k]: !o[k] }));
  }

  addToCart(): void {
    const p = this.product();
    if (p) this.cart.addItem(p, this.quantity(), this.selectedRipeness());
  }

  buyNow(): void {
    this.addToCart();
    this.router.navigate(['/checkout']);
  }
}
