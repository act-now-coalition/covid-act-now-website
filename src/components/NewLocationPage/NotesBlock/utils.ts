import { CcviLevel, getCcviLevel } from 'common/ccvi/index';

export function isHighVulnerability(score: number) {
  return getCcviLevel(score) === CcviLevel.VERY_HIGH;
}
