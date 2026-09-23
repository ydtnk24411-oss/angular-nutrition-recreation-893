import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';
import { navItems, logoImage } from '../../shared/data/xanh-la.data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  protected cart = inject(CartService);
  protected router = inject(Router);

  protected readonly navItems = navItems;
  protected readonly logoImage = logoImage;

  protected mobileMenuOpen = signal(false);
  protected userMenuOpen = signal(false);

  toggleMobileMenu(): void { this.mobileMenuOpen.update(v => !v); }
  closeMobileMenu(): void  { this.mobileMenuOpen.set(false); }
  toggleUserMenu(): void   { this.userMenuOpen.update(v => !v); }
  closeUserMenu(): void    { this.userMenuOpen.set(false); }

  logout(): void {
    this.cart.logout();
    this.userMenuOpen.set(false);
  }

  isActive(path: string): boolean {
    if (path === '/') return this.router.url === '/';
    return this.router.url.startsWith(path);
  }
}
