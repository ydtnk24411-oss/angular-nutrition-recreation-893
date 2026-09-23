import { Injectable, signal, computed } from '@angular/core';
import { XanhLaProduct, XanhLaCartItem, XanhLaUser } from '../models/xanh-la.models';

const CART_KEY = 'xanhla_cart_items';
const USER_KEY = 'xanhla_user_session';

export type AuthTab = 'login' | 'signup';

function priceValue(price: string): number {
  return Number(price.replace(/[^\d.]/g, ''));
}

export function formatPrice(value: number): string {
  return `${value.toLocaleString('vi-VN')} ₫`;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  // --- Cart state ---
  private _items = signal<XanhLaCartItem[]>(this._loadCart());
  readonly items = this._items.asReadonly();
  readonly itemCount = computed(() =>
    this._items().reduce((t, i) => t + i.quantity, 0)
  );
  readonly subtotal = computed(() =>
    this._items().reduce(
      (t, i) => t + priceValue(i.product.price) * i.quantity,
      0
    )
  );

  // --- Drawer ---
  private _cartDrawerOpen = signal(false);
  readonly cartDrawerOpen = this._cartDrawerOpen.asReadonly();

  // --- Auth ---
  private _currentUser = signal<XanhLaUser | null>(this._loadUser());
  readonly currentUser = this._currentUser.asReadonly();

  private _authModalOpen = signal(false);
  readonly authModalOpen = this._authModalOpen.asReadonly();

  private _authTab = signal<AuthTab>('login');
  readonly authTab = this._authTab.asReadonly();

  // ---- Cart methods ----
  addItem(product: XanhLaProduct, quantity = 1, selectedOption?: string): void {
    this._items.update((current) => {
      const idx = current.findIndex(
        (i) => i.product.slug === product.slug && i.selectedOption === selectedOption
      );
      const updated =
        idx >= 0
          ? current.map((i, index) =>
              index === idx ? { ...i, quantity: i.quantity + quantity } : i
            )
          : [...current, { product, quantity, selectedOption }];
      this._saveCart(updated);
      return updated;
    });
    this._cartDrawerOpen.set(true);
  }

  updateQuantity(slug: string, quantity: number): void {
    this._items.update((current) => {
      const updated =
        quantity <= 0
          ? current.filter((i) => i.product.slug !== slug)
          : current.map((i) =>
              i.product.slug === slug ? { ...i, quantity } : i
            );
      this._saveCart(updated);
      return updated;
    });
  }

  removeItem(slug: string): void {
    this._items.update((current) => {
      const updated = current.filter((i) => i.product.slug !== slug);
      this._saveCart(updated);
      return updated;
    });
  }

  clear(): void {
    this._items.set([]);
    localStorage.removeItem(CART_KEY);
  }

  openCartDrawer(): void  { this._cartDrawerOpen.set(true); }
  closeCartDrawer(): void { this._cartDrawerOpen.set(false); }

  // ---- Auth methods ----
  login(email: string, name?: string): void {
    const user: XanhLaUser = { name: name ?? email.split('@')[0], email };
    this._currentUser.set(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this._authModalOpen.set(false);
  }

  signup(name: string, email: string): void {
    const user: XanhLaUser = { name, email };
    this._currentUser.set(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this._authModalOpen.set(false);
  }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem(USER_KEY);
  }

  openAuthModal(tab: AuthTab = 'login'): void {
    this._authTab.set(tab);
    this._authModalOpen.set(true);
  }

  closeAuthModal(): void { this._authModalOpen.set(false); }
  setAuthTab(tab: AuthTab): void { this._authTab.set(tab); }

  // ---- Helpers ----
  private _loadCart(): XanhLaCartItem[] {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  private _saveCart(items: XanhLaCartItem[]): void {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch { /**/ }
  }

  private _loadUser(): XanhLaUser | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
}
