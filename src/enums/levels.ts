import { COLOR_MAP } from 'enums/interventions';

export interface LevelInfo {
  level: string;
  upperLimit: number;
  name: string;
  color: string;
  detail: string;
}

export enum Level {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  UNKNOWN = 'UNKNOWN',
}

export const LEVEL_COLOR = {
  [Level.LOW]: COLOR_MAP.GREEN.BASE,
  [Level.MEDIUM]: COLOR_MAP.ORANGE.BASE,
  [Level.HIGH]: COLOR_MAP.RED.BASE,
  [Level.UNKNOWN]: COLOR_MAP.GRAY.BASE,
};

export interface Levels {
  [Level.LOW]: LevelInfo;
  [Level.MEDIUM]: LevelInfo;
  [Level.HIGH]: LevelInfo;
  [Level.UNKNOWN]: LevelInfo;
}
