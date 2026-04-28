import { Component, effect, inject, signal } from '@angular/core';
import { TimeService } from './core/providers/services/time-service';
import { EventService } from './core/providers/services/event-service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  private timeService = inject(TimeService);
  private eventService = inject(EventService);

  day = this.timeService.day;

  constructor() {
    effect(() => {
      this.eventService.addEvent('test', 3, () => {
        const d = inject(TimeService).day();
        console.log("The day is", d);
      });
    })
  }

  onClick() {
    this.timeService.nextDay();
  }
}
