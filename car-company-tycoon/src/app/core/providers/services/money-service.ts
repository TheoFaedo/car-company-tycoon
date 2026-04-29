import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MoneyService {
    private _money = signal<number>(1000);

    money = this._money.asReadonly();

    addMoney(amount: number) {
        this._money.update((money) => money + amount);
    }

    removeMoney(amount: number) {
        this._money.update((money) => money - amount);
    }
}