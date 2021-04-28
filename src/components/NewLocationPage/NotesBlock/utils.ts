import { CcviLevel, getCcviLevel } from 'common/ccvi/index';

export function hasVeryHighVulnerability(score: number) {
  return getCcviLevel(score) === CcviLevel.VERY_HIGH;
}
