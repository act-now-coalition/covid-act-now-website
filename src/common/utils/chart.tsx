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
    case Level.HIGH:
      return mediumHighText;
    case Level.CRITICAL:
      return highText;
    case Level.SUPER_CRITICAL:
      // TODO(michael): Do we need to customize this?  We don't actually use this
      // function for case density, so it probably doesn't matter.
      return highText;
  }
}
