import { Level } from 'common/level';

/**
 * Depending on provided `level`, returns the provided `lowText`, `mediumText`,
 * `mediumHighText` or `highText`.
 */
export function levelText(
  level: Level,
  lowText: string,
  mediumText: string,
  mediumHighText: string,
  highText: string,
) {
  switch (level) {
    case Level.LOW:
      return lowText;
    case Level.MEDIUM:
      return mediumText;
    case Level.MEDIUM_HIGH:
      return mediumHighText;
    case Level.HIGH:
      return highText;
  }
}
