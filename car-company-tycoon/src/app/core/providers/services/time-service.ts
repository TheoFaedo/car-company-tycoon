import { computed, inject, Injectable, INJECTOR, runInInjectionContext, signal } from "@angular/core";
import { EventService } from "./event-service";

@Injectable({
    providedIn: 'root'
})
export class TimeService {
    private eventService = inject(EventService);
    private injector = inject(INJECTOR);

    private _day = signal<number>(0);

    public day = this._day.asReadonly();

    nextDay() {
        this._day.update((d) => d + 1);
        this.triggerTodayEvents();
    }

    triggerTodayEvents() {
        const todayEvents = this.eventService.events()[this._day()];

        todayEvents.forEach((e) => {
            try {
                runInInjectionContext(this.injector, e.action);
            } catch (error) {
                console.error(`Error on event "${e.title}" (${e.id}) :`, error);
            } finally {
                this.eventService.clearEventsOfDay(this._day());
            }
        })
    }
}