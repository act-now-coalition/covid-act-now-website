export enum Level {
  LOW,
  MEDIUM,
  HIGH,
  UNKNOWN,
}

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
  [Level.HIGH]: LevelInfo;
  [Level.UNKNOWN]: LevelInfo;
}
