import { Routes } from '@angular/router';

export const routes: Routes = [
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
  {
    path: '**',
    redirectTo: '',
  },
];
