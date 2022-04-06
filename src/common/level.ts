// Make sure to not change the level numbers (even if we delete CRITICAL and
// SUPER_CRITICAL). The values are used to determine which image to show in
// the alert emails.
export enum Level {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  CRITICAL = 3,
  UNKNOWN = 4,
  SUPER_CRITICAL = 5,
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
  detail(locationName?: string): string | React.ReactElement;
}

export interface LevelInfoMap {
  [Level.LOW]: LevelInfo;
  [Level.MEDIUM]: LevelInfo;
  [Level.HIGH]: LevelInfo;
  [Level.CRITICAL]: LevelInfo;
  [Level.SUPER_CRITICAL]: LevelInfo;
  [Level.UNKNOWN]: LevelInfo;
}
