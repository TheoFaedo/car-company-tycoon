import { UUID } from "./uuid";

export interface Event {
    id: UUID;
    title: string;
    activationDay: number;
    action: () => void;
}