import { Routes } from '@angular/router';
import { adminGuard } from './shared/guards/admin.guard';

export const routes: Routes = [
  // ── Public storefront routes ──────────────────────────────────
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'online-ordering',
    loadComponent: () =>
      import('./pages/ordering/ordering.component').then((m) => m.OrderingComponent),
  },
  {
    path: 'menus',
    loadComponent: () =>
      import('./pages/menus/menus.component').then((m) => m.MenusComponent),
  },
  {
    path: 'menus-1',
    loadComponent: () =>
      import('./pages/menus/menus.component').then((m) => m.MenusComponent),
    data: { secondary: true },
  },
  {
    path: 'event-list',
    loadComponent: () =>
      import('./pages/events/events.component').then((m) => m.EventsComponent),
  },
  {
    path: 'event-details/:slug',
    loadComponent: () =>
      import('./pages/event-detail/event-detail.component').then((m) => m.EventDetailComponent),
  },
  {
    path: 'category/all-products',
    loadComponent: () =>
      import('./pages/catalog/catalog.component').then((m) => m.CatalogComponent),
  },
  {
    path: 'category/:slug',
    loadComponent: () =>
      import('./pages/catalog/catalog.component').then((m) => m.CatalogComponent),
  },
  {
    path: 'product-page/:slug',
    loadComponent: () =>
      import('./pages/product-detail/product-detail.component').then((m) => m.ProductDetailComponent),
  },
  {
    path: 'book-online',
    loadComponent: () =>
      import('./pages/booking/booking.component').then((m) => m.BookingComponent),
  },
  {
    path: 'service-page/:slug',
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then((m) => m.ServiceDetailComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
  {
    path: 'tracker-page',
    loadComponent: () =>
      import('./pages/tracker/tracker.component').then((m) => m.TrackerComponent),
  },

  // ── Admin routes ──────────────────────────────────────────────
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./admin/login/login.component').then((m) => m.AdminLoginComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/dashboard/dashboard.component').then((m) => m.AdminDashboardComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./admin/products/products.component').then((m) => m.AdminProductsComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./admin/orders/orders.component').then((m) => m.AdminOrdersComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./admin/users/users.component').then((m) => m.AdminUsersComponent),
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./admin/events/events.component').then((m) => m.AdminEventsComponent),
      },
      {
        path: 'bookings',
        loadComponent: () =>
          import('./admin/bookings/bookings.component').then((m) => m.AdminBookingsComponent),
      },
    ],
  },

  // ── Fallback ──────────────────────────────────────────────────
  { path: '**', redirectTo: '' },
];
