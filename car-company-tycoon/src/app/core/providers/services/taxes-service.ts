import { inject, Injectable, signal } from "@angular/core";
import { Tax as Taxe } from "../../../shared/models/taxe";
import { UUID } from "../../../shared/models/uuid";
import { MoneyService } from "./money-service";

@Injectable({
    providedIn: 'root'
})
export class TaxesService {
    private moneyService = inject(MoneyService);

    payTaxes() {
        this.moneyService.removeMoney(300);
    }

}