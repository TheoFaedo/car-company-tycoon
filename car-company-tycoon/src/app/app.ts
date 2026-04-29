import { Component, effect, inject, signal } from '@angular/core';
import { TimeService } from './core/providers/services/time-service';
import { EventService } from './core/providers/services/event-service';
import { MoneyService } from './core/providers/services/money-service';
import { TaxesService } from './core/providers/services/taxes-service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  private timeService = inject(TimeService);
  private eventService = inject(EventService);
  private moneyService = inject(MoneyService);

  day = this.timeService.day;
  money = this.moneyService.money;

  constructor() {
    effect(() => {
      this.eventService.addEvent('test', 3, () => {
        const d = inject(TimeService).day();
        console.log("The day is", d);
      });

      this.eventService.addEvent('paiement des impots', 3, () => {
        const taxesService = inject(TaxesService);
        taxesService.payTaxes();
      });
    })
  }

  onClick() {
    this.timeService.nextDay();
  }
}
