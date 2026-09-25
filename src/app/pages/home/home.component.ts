import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShellComponent } from '../../components/shell/shell.component';
import { CartService } from '../../shared/services/cart.service';
import { ProductApiService, ApiProduct } from '../../shared/services/product-api.service';
import {
  categories, meals, nutritionGoals, heroImage, originImage,
} from '../../shared/data/xanh-la.data';
import { XanhLaProduct } from '../../shared/models/xanh-la.models';

function toCartProduct(p: ApiProduct): XanhLaProduct {
  return {
    id: p._id, name: p.name, slug: p.slug, price: p.price,
    priceNumber: p.priceNumber, image: p.image,
    category: p.category as 'Vegetables' | 'Fruits' | 'Meat',
    categoryVi: p.categoryVi, description: p.description,
    container: p.container, cutType: p.cutType, cutting: p.cutting,
    packSize: p.packSize, packaging: p.packaging, preparation: p.preparation,
    quantity: p.quantity, ripeness: p.ripeness, sizeGroup: p.sizeGroup,
    thickness: p.thickness, type: p.type, weight: p.weight,
    options: p.options,
  };
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ShellComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  protected cart       = inject(CartService);
  private productApi   = inject(ProductApiService);

  // Static data (categories, meals, nutrition goals không cần DB)
  protected readonly categories      = categories;
  protected readonly meals           = meals;
  protected readonly nutritionGoals  = nutritionGoals;
  protected readonly heroImage       = heroImage;
  protected readonly originImage     = originImage;

  // Products từ API
  protected apiProducts = signal<ApiProduct[]>([]);
  protected loadingProds = signal(true);

  // Carousel
  protected carouselStart = signal(0);
  protected readonly visibleCount = 4;
  protected get maxStart() { return Math.max(0, this.apiProducts().length - this.visibleCount); }
  protected get carouselTransform() {
    return `translateX(calc(-${this.carouselStart()} * ((100% - 72px) / 4 + 24px)))`;
  }

  prevSlide(): void { this.carouselStart.update(v => Math.max(0, v - 1)); }
  nextSlide(): void { this.carouselStart.update(v => Math.min(this.maxStart, v + 1)); }

  ngOnInit(): void {
    this.productApi.getAll({ limit: 9, sort: 'createdAt' }).subscribe({
      next: (res) => { this.apiProducts.set(res.data); this.loadingProds.set(false); },
      error: ()   => { this.loadingProds.set(false); },
    });
  }

  productSlug(p: ApiProduct): string {
    return p.slug.startsWith('/') ? p.slug : `/product-page/${p.slug}`;
  }

  addToCart(p: ApiProduct): void {
    this.cart.addItem(toCartProduct(p), 1);
  }
}
