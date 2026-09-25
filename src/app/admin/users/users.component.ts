import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserApiService, ApiUser } from '../../shared/services/user-api.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class AdminUsersComponent implements OnInit {
  private userApi = inject(UserApiService);

  users    = signal<ApiUser[]>([]);
  total    = signal(0);
  loading  = signal(true);
  saving   = signal(false);
  error    = signal('');
  success  = signal('');

  search = signal('');
  role   = signal('');
  page   = signal(1);
  readonly limit = 15;

  selected   = signal<ApiUser | null>(null);
  modalOpen  = signal(false);
  editRole   = signal<'customer' | 'admin'>('customer');
  editActive = signal(true);

  totalPages = computed(() => Math.ceil(this.total() / this.limit));

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    const p: Record<string, string | number> = { page: this.page(), limit: this.limit };
    if (this.search()) p['search'] = this.search();
    if (this.role())   p['role']   = this.role();
    this.userApi.getAll(p).subscribe({
      next:  (r) => { this.users.set(r.data); this.total.set(r.total); this.loading.set(false); },
      error: ()  => { this.error.set('Không thể tải người dùng.'); this.loading.set(false); },
    });
  }

  onSearch(v: string): void { this.search.set(v); this.page.set(1); this.load(); }
  onRole(v: string): void   { this.role.set(v);   this.page.set(1); this.load(); }
  prevPage(): void { if (this.page() > 1)              { this.page.update(p => p - 1); this.load(); } }
  nextPage(): void { if (this.page() < this.totalPages()){ this.page.update(p => p + 1); this.load(); } }

  openEdit(u: ApiUser): void {
    this.selected.set(u);
    this.editRole.set(u.role);
    this.editActive.set(u.isActive);
    this.error.set('');
    this.modalOpen.set(true);
  }
  closeModal(): void { this.modalOpen.set(false); }

  save(): void {
    const u = this.selected();
    if (!u) return;
    this.saving.set(true);
    this.userApi.update(u._id, { role: this.editRole(), isActive: this.editActive() }).subscribe({
      next: () => {
        this.saving.set(false);
        this.closeModal();
        this.success.set('Đã cập nhật người dùng!');
        setTimeout(() => this.success.set(''), 3000);
        this.load();
      },
      error: (err) => { this.saving.set(false); this.error.set(err.error?.message || 'Lưu thất bại.'); },
    });
  }

  remove(u: ApiUser): void {
    if (!confirm(`Vô hiệu hoá tài khoản "${u.name}"?`)) return;
    this.userApi.remove(u._id).subscribe({
      next: () => { this.success.set('Đã vô hiệu hoá tài khoản.'); setTimeout(() => this.success.set(''), 3000); this.load(); },
      error: () => this.error.set('Thao tác thất bại.'),
    });
  }
}
