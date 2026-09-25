import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminAuthService } from '../../shared/services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class AdminLoginComponent {
  private auth   = inject(AdminAuthService);
  private router = inject(Router);

  email    = signal('admin@xanhla.farm');
  password = signal('admin123');
  loading  = signal(false);
  error    = signal('');

  submit(e: Event): void {
    e.preventDefault();
    if (!this.email() || !this.password()) return;

    this.loading.set(true);
    this.error.set('');

    this.auth.login(this.email(), this.password()).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res.success && res.user.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.error.set('Tài khoản không có quyền admin.');
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Đăng nhập thất bại.');
      },
    });
  }
}
