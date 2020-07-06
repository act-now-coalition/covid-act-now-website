export enum Level {
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL,
  UNKNOWN,
}

export interface LevelInfo {
  level: Level;
  upperLimit: number;
  name: string;
  color: string;
  summary?: string;
  detail(locationName?: string): string;
}

export interface LevelInfoMap {
  [Level.LOW]: LevelInfo;
  [Level.MEDIUM]: LevelInfo;
  [Level.HIGH]: LevelInfo;
  [Level.CRITICAL]: LevelInfo;
  [Level.UNKNOWN]: LevelInfo;
}
