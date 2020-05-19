import { Level } from 'common/level';

/**
 * Depending on provided `level`, returns the provided `lowText`, `mediumText`,
 * or `highText`.
 */
export function levelText(
  level: Level,
  lowText: string,
  mediumText: string,
  highText: string,
) {
  return level === Level.LOW
    ? lowText
    : level === Level.MEDIUM
    ? mediumText
    : highText;
}
