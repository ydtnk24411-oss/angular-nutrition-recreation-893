import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../../shared/services/admin-auth.service';

interface NavItem {
  label: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  protected auth   = inject(AdminAuthService);
  protected router = inject(Router);

  sidebarOpen = signal(true);

  readonly navItems: NavItem[] = [
    { label: 'Dashboard',  icon: '📊', path: '/admin/dashboard' },
    { label: 'Sản phẩm',  icon: '🥦', path: '/admin/products'  },
    { label: 'Đơn hàng',  icon: '📦', path: '/admin/orders'    },
    { label: 'Người dùng',icon: '👥', path: '/admin/users'     },
    { label: 'Sự kiện',   icon: '📅', path: '/admin/events'    },
    { label: 'Đặt lịch',  icon: '🗓',  path: '/admin/bookings'  },
  ];

  toggleSidebar(): void { this.sidebarOpen.update(v => !v); }
  logout(): void        { this.auth.logout(); }
}
