import { Region, State, County } from 'common/regions';
import { CcviLevel, getCcviLevel } from './index';
import { formatPercent } from 'common/utils';

// TODO (chelsi) - these functions are kind of repetative. consolidate post-launch

export function getShareQuote(
  overallScore: number,
  region: Region,
  percentPopulationVulnerable?: number,
): string {
  const level = getCcviLevel(overallScore);
  const scoreAsPercent = formatPercent(overallScore);

  const baseText = `Communities across the U.S. are not all equally vulnerable to the effects of the pandemic. According to @CovidActNow, ${region.shortName}`;

  const levelToShareQuote = {
    [CcviLevel.VERY_HIGH]: getVeryHighShareQuote(region, scoreAsPercent),
    [CcviLevel.HIGH]: getHighShareQuote(region, scoreAsPercent),
    [CcviLevel.MEDIUM]: getMediumShareQuote(region),
    [CcviLevel.LOW]: getLowShareQuote(region),
    [CcviLevel.VERY_LOW]: getVeryLowShareQuote(
      region,
      percentPopulationVulnerable,
    ),
  };

  return `${baseText} ${levelToShareQuote[level]}`;
}

function getVeryHighShareQuote(region: Region, scoreAsPercent: string): string {
  if (region instanceof State) {
    return `is one of the most vulnerable U.S. states. Learn more:`;
  }
  if (region instanceof County) {
    return `is more vulnerable than ${scoreAsPercent} of U.S. counties. Learn more:`;
  }
  return `is more vulnerable than ${scoreAsPercent} of U.S. metros. Learn more:`;
}

function getHighShareQuote(region: Region, scoreAsPercent: string): string {
  if (region instanceof State) {
    return `has higher vulnerability than most states. Learn more:`;
  }
  if (region instanceof County) {
    return `is more vulnerable than ${scoreAsPercent} of U.S. counties. Learn more:`;
  }
  return `is more vulnerable than ${scoreAsPercent} of U.S. metros. Learn more:`;
}

function getMediumShareQuote(region: Region): string {
  if (region instanceof State) {
    return `has average vulnerability. Learn more:`;
  }
  if (region instanceof County) {
    return `has average vulnerability among U.S. counties. Learn more:`;
  }
  return `has average vulnerability among U.S. metros. Learn more:`;
}

function getLowShareQuote(region: Region): string {
  if (region instanceof State) {
    return `has lower vulnerability than most states. Learn more:`;
  }
  if (region instanceof County) {
    return `has lower vulnerability than most U.S. counties. Learn more:`;
  }
  return `has lower vulnerability than most U.S. metros. Learn more:`;
}

function getVeryLowShareQuote(
  region: Region,
  percentPopulationVulnerable?: number,
): string {
  if (region instanceof State) {
    return `is one of the least vulnerable states. ${
      percentPopulationVulnerable
        ? `However, ${percentPopulationVulnerable}% of the population is in a high vulnerability area. Learn more:`
        : ' Learn more:'
    }`;
  }
  if (region instanceof County) {
    return `is one of the least vulnerable US counties. Learn more:`;
  }
  return `is one of the least vulnerable US metros. Learn more:`;
}
