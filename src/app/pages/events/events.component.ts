import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShellComponent } from '../../components/shell/shell.component';
import { eventsList } from '../../shared/data/xanh-la.data';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [ShellComponent, RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent {
  protected readonly events = eventsList;
}
