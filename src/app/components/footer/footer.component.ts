import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { logoImage } from '../../shared/data/xanh-la.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  protected readonly logoImage = logoImage;
  protected email = signal('');
  protected subscribed = signal(false);

  handleSubscribe(e: Event): void {
    e.preventDefault();
    if (this.email()) {
      this.subscribed.set(true);
      this.email.set('');
    }
  }
}
