import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalEvents: number;
  totalBookings: number;
  pendingOrders: number;
  totalRevenue: number;
  recentOrders: {
    _id: string;
    orderCode: string;
    guestName: string;
    total: number;
    status: string;
    createdAt: string;
  }[];
  ordersByStatus: { _id: string; count: number }[];
}

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  private api = inject(ApiService);

  getStats() {
    return this.api.get<{ success: boolean; data: DashboardStats }>('/dashboard/stats');
  }

  getRevenue() {
    return this.api.get<{ success: boolean; data: { _id: { year: number; month: number }; revenue: number; count: number }[] }>('/dashboard/revenue');
  }
}
