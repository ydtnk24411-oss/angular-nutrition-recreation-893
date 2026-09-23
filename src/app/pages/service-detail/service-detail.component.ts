import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShellComponent } from '../../components/shell/shell.component';
import { CartService } from '../../shared/services/cart.service';
import { serviceBySlug } from '../../shared/data/xanh-la.data';
import { ServiceItem } from '../../shared/models/xanh-la.models';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, ShellComponent, RouterLink],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css',
})
export class ServiceDetailComponent implements OnInit {
  protected cart = inject(CartService);
  private route = inject(ActivatedRoute);

  protected service = signal<ServiceItem | null>(null);
  protected booked = signal(false);
  protected selectedDate = signal('2026-10-25');
  protected selectedTime = signal('10:00 AM');

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.service.set(serviceBySlug[slug] ?? serviceBySlug['/service-page/' + slug] ?? null);
  }

  handleBooking(e: Event): void {
    e.preventDefault();
    this.booked.set(true);
  }
}
