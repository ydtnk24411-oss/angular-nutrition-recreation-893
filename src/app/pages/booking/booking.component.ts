import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShellComponent } from '../../components/shell/shell.component';
import { servicesList } from '../../shared/data/xanh-la.data';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ShellComponent, RouterLink],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent {
  protected readonly services = servicesList;
}
