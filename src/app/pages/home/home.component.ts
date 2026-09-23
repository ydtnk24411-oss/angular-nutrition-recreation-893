import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShellComponent } from '../../components/shell/shell.component';
import { CartService } from '../../shared/services/cart.service';
import {
  categories, products, meals, nutritionGoals,
  heroImage, originImage,
} from '../../shared/data/xanh-la.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShellComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  protected cart = inject(CartService);
  protected readonly categories = categories;
  protected readonly products = products;
  protected readonly meals = meals;
  protected readonly nutritionGoals = nutritionGoals;
  protected readonly heroImage = heroImage;
  protected readonly originImage = originImage;

  protected carouselStart = signal(0);
  protected readonly visibleCount = 4;
  protected get maxStart() { return this.products.length - this.visibleCount; }
  protected get carouselTransform() {
    return `translateX(calc(-${this.carouselStart()} * ((100% - 72px) / 4 + 24px)))`;
  }

  prevSlide(): void { this.carouselStart.update(v => Math.max(0, v - 1)); }
  nextSlide(): void { this.carouselStart.update(v => Math.min(this.maxStart, v + 1)); }
}
