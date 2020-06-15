export enum Level {
  LOW,
  MEDIUM,
  MEDIUM_HIGH,
  HIGH,
  UNKNOWN,
}

// Not sure if there's a better way to enumerate all enum values? :-(
export const ALL_LEVELS = Object.values(Level).filter(
  v => typeof v === 'number',
) as Level[];

export interface LevelInfo {
  level: Level;
  upperLimit: number;
  name: string;
  color: string;
  detail(locationName?: string): string;
}

export interface LevelInfoMap {
  [Level.LOW]: LevelInfo;
  [Level.MEDIUM]: LevelInfo;
  [Level.MEDIUM_HIGH]: LevelInfo;
  [Level.HIGH]: LevelInfo;
  [Level.UNKNOWN]: LevelInfo;
}
