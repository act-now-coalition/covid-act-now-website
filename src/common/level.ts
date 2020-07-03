export enum Level {
  LOW,
  MEDIUM,
  MEDIUM_HIGH,
  CRITICAL,
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
  [Level.MEDIUM_HIGH]: LevelInfo;
  [Level.CRITICAL]: LevelInfo;
  [Level.UNKNOWN]: LevelInfo;
}
