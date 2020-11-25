import { Level } from 'common/level';

/**
 * Depending on provided `level`, returns the appropriate text (`lowText`,
 * `mediumText`, etc.)
 */
export function levelText(
  level: Level,
  lowText: string,
  mediumText: string,
  mediumHighText: string,
  highText: string,
  superCriticalText?: string,
) {
  switch (level) {
    case Level.LOW:
      return lowText;
    case Level.MEDIUM:
      return mediumText;
    case Level.HIGH:
      return mediumHighText;
    case Level.CRITICAL:
      return highText;
    case Level.SUPER_CRITICAL:
      return superCriticalText;
  }
}
