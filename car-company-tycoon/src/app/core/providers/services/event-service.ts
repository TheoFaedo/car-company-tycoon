import { Injectable, signal } from "@angular/core";
import { Event } from "../../../shared/models/event";

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private _events = signal<Record<number, Event[]>>({});

    addEvent(title: string, activationDay: number, action: () => void): void {
        const mappedEvent = this.mapToEvent(title, activationDay, action);

        this._events.update((eventRecord) => ({
            ...eventRecord,
            [activationDay]: [...eventRecord[activationDay] ?? [], mappedEvent]
        }));
    }

    clearEventsOfDay(day: number) {
        this._events.update((eventRecord) => {
            const newRecord = { ...eventRecord };
            delete newRecord[day];
            return newRecord;
        });
    }

    private mapToEvent(title: string, activationDay: number, action: () => void): Event {
        return {
            id: crypto.randomUUID(),
            title,
            activationDay,
            action
        }
    }

    public events = this._events.asReadonly();
}