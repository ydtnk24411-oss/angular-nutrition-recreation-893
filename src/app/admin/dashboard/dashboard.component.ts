import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardApiService, DashboardStats } from '../../shared/services/dashboard-api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  private dashApi = inject(DashboardApiService);

  stats   = signal<DashboardStats | null>(null);
  loading = signal(true);
  error   = signal('');

  readonly statCards = [
    { key: 'totalProducts', label: 'Sản phẩm',   icon: '🥦', color: '#e9f5e9', route: '/admin/products'  },
    { key: 'totalOrders',   label: 'Đơn hàng',   icon: '📦', color: '#e8f0fe', route: '/admin/orders'    },
    { key: 'totalUsers',    label: 'Khách hàng',  icon: '👥', color: '#fce8ff', route: '/admin/users'     },
    { key: 'totalEvents',   label: 'Sự kiện',     icon: '📅', color: '#fff3e0', route: '/admin/events'    },
    { key: 'totalBookings', label: 'Đặt lịch',    icon: '🗓',  color: '#e0f2fe', route: '/admin/bookings'  },
    { key: 'pendingOrders', label: 'Chờ xử lý',   icon: '⏳', color: '#fffde7', route: '/admin/orders'    },
  ];

  readonly orderStatusMap: Record<string, string> = {
    pending:   'Chờ xử lý',
    confirmed: 'Đã xác nhận',
    preparing: 'Đang chuẩn bị',
    shipping:  'Đang giao',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy',
  };

  ngOnInit(): void {
    this.dashApi.getStats().subscribe({
      next: (res) => {
        this.stats.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Không thể tải dữ liệu.');
        this.loading.set(false);
      },
    });
  }

  formatPrice(val: number): string {
    return val.toLocaleString('vi-VN') + ' ₫';
  }

  statValue(key: string): number {
    const s = this.stats();
    if (!s) return 0;
    return (s as unknown as Record<string, number>)[key] ?? 0;
  }
}
