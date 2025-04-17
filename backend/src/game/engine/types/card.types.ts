// Backend Enum Definition (use string enum values)
export enum Color {
    Red = "red",
    Yellow = "yellow",
    Green = "green",
    Blue = "blue",
    Wild = "wild"
}

export enum Value {
    One = "1",
    Two = "2",
    Three = "3",
    Four = "4",
    Five = "5",
    Six = "6",
    Seven = "7",
    Eight = "8",
    Nine = "9",
    Ten = "10",
    Eleven = "11",
    Twelve = "12",
    Wild = "wild",
    Skip = "skip"
}

export interface Card {
    id: string;
    color: Color;
    value: Value;
}

export interface Player {
    id: string;
    name: string;
    hand: Card[];
    round: number;
    hasGoneOut?: boolean;
}
