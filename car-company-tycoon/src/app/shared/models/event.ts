export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface Event {
    id: UUID;
    title: string;
    activationDay: number;
    action: () => void;
}