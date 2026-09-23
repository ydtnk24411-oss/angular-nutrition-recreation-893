import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShellComponent } from '../../components/shell/shell.component';
import { CartService } from '../../shared/services/cart.service';
import { eventBySlug } from '../../shared/data/xanh-la.data';
import { EventItem } from '../../shared/models/xanh-la.models';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, ShellComponent, RouterLink],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
})
export class EventDetailComponent implements OnInit {
  protected cart = inject(CartService);
  private route = inject(ActivatedRoute);

  protected event = signal<EventItem | null>(null);
  protected registered = signal(false);
  protected fullName = signal('');
  protected email = signal('');

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.event.set(eventBySlug[slug] ?? eventBySlug['/event-details/' + slug] ?? null);
  }

  handleRegister(e: Event): void {
    e.preventDefault();
    this.registered.set(true);
  }
}
