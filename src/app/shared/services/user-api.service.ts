import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

export interface ApiUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  isActive: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private api = inject(ApiService);

  getAll(params?: Record<string, string | number>) {
    return this.api.get<{ success: boolean; total: number; data: ApiUser[] }>('/users', params);
  }

  getById(id: string) {
    return this.api.get<{ success: boolean; data: ApiUser }>(`/users/${id}`);
  }

  update(id: string, body: Partial<ApiUser>) {
    return this.api.put<{ success: boolean; data: ApiUser }>(`/users/${id}`, body);
  }

  remove(id: string) {
    return this.api.delete<{ success: boolean }>(`/users/${id}`);
  }
}
