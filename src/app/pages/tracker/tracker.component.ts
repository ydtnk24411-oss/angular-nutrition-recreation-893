import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from '../../components/shell/shell.component';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, ShellComponent],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css',
})
export class TrackerComponent {
  protected code = signal('');
  protected tracked = signal(false);

  handleSubmit(e: Event): void {
    e.preventDefault();
    if (this.code()) this.tracked.set(true);
  }
}
