import React from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { HashLink } from 'react-router-hash-link';
import { scrollWithOffset } from 'components/TableOfContents';

// Note: These names are used on SocialLocationPreview
const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const MEDIUM_HIGH_NAME = 'High';
const HIGH_NAME = 'Very high';
const SUPER_CRITICAL_NAME = 'Severe';
const UNKNOWN = 'Unknown';

const LEGEND_SUMMARY_LOW = 'Low risk';
const LEGEND_SUMMARY_MEDIUM = 'Medium risk';
const LEGEND_SUMMARY_MEDIUM_HIGH = 'High risk';
const LEGEND_SUMMARY_HIGH = 'Very high risk';
const LEGEND_SUMMARY_SUPER_CRITICAL = 'Severe risk';

const recommendationsLink = (
  <HashLink
    smooth
    scroll={(element: HTMLElement) => scrollWithOffset(element, -180)}
    to="#recommendations"
  >
    official recommended actions
  </HashLink>
);

export const LOCATION_SUMMARY_LEVELS: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 0,
    name: LOW_NAME,
    summary: LEGEND_SUMMARY_LOW,
    color: COLOR_MAP.GREEN.BASE,
    detail: locationName => <>See {recommendationsLink}.</>,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 0,
    name: MEDIUM_NAME,
    summary: LEGEND_SUMMARY_MEDIUM,
    color: COLOR_MAP.ORANGE.BASE,
    detail: locationName => <>See {recommendationsLink}.</>,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 0,
    name: MEDIUM_HIGH_NAME,
    summary: LEGEND_SUMMARY_MEDIUM_HIGH,
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: locationName => (
      <>Take precautions to avoid exposure, including {recommendationsLink}.</>
    ),
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: 0,
    name: HIGH_NAME,
    summary: LEGEND_SUMMARY_HIGH,
    color: COLOR_MAP.RED.BASE,
    detail: locationName => (
      <>
        Take strong precautions to avoid exposure, including{' '}
        {recommendationsLink}.
      </>
    ),
  },
  [Level.SUPER_CRITICAL]: {
    level: Level.SUPER_CRITICAL,
    upperLimit: 0,
    name: SUPER_CRITICAL_NAME,
    summary: LEGEND_SUMMARY_SUPER_CRITICAL,
    color: COLOR_MAP.RED.DARK,
    detail: locationName => (
      <>
        Take all possible precautions to avoid exposure, including{' '}
        {recommendationsLink}.
      </>
    ),
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: UNKNOWN,
    summary: UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: locationName => 'We don’t have enough data to assess COVID risk.',
  },
};
