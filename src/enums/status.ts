// TODO(sgoldblatt) get the colors hex 
enum Color {
    RED = "#FC374D",
    YELLOW = "#FFC020", 
    GREEN = "#50D17E",
}

export enum Level {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

export interface Status {
    color: Color,
    details: string,
    level: Level,
}

export interface Statuses {
    [Level.LOW]: Status,
    [Level.MEDIUM]: Status, 
    [Level.HIGH]: Status,
}

export const INFECTION_RATE_STATUSES: Statuses = {
    [Level.LOW]: {
        color: Color.GREEN,
        details: "Much Good.",
        level: Level.LOW,
    },
    [Level.MEDIUM]: {
        color: Color.YELLOW,
        details: "Meh. You okay.",
        level: Level.MEDIUM,
    },
    [Level.HIGH]: {
        color: Color.RED,
        details: "Yikes!",
        level: Level.HIGH,
    }
}