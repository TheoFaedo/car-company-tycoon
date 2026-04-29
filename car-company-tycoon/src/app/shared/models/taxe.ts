import { UUID } from "./uuid";

export interface Tax {
    id: UUID;
    name: string;
    amount: number;
}