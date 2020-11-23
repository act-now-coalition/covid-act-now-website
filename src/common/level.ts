export enum Level {
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL,
  SUPER_CRITICAL,
  UNKNOWN,
}

export const ALL_LEVELS = [
  Level.LOW,
  Level.MEDIUM,
  Level.HIGH,
  Level.CRITICAL,
  Level.SUPER_CRITICAL,
  Level.UNKNOWN,
];

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
  [Level.SUPER_CRITICAL]: LevelInfo;
  [Level.UNKNOWN]: LevelInfo;
}
