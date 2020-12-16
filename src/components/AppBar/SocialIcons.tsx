/*
Note (Chelsi):
We're replacing social icons with a 'Donate' button for the time being.
Keeping all social-icons-related code here for if/when we reinstate them.
*/

import React, { Fragment } from 'react';
import { find } from 'lodash';
import { useLocation, match as MatchType, matchPath } from 'react-router-dom';
import { useIsEmbed } from 'common/utils/hooks';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import { STATES } from 'common';
import US_STATE_DATASET from '../MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import * as urls from 'common/urls';
import { trackShare } from 'components/Analytics';

function locationNameFromMatch(
  match: MatchType<{ id: keyof typeof STATES; county?: string }> | null,
) {
  if (!match || !match.params) {
    return '';
  }

  const stateId = match.params.id.toUpperCase() as keyof typeof STATES;
  const state = STATES[stateId];
  const countyId = match.params.county;
  if (!state) {
    // if invalid state entered in URL, redirect to homepage
    window.location.href = '/';
  }

  if (!countyId) {
    return state;
  }

  const countyData = find(
    // @ts-ignore TODO(aj): Fix this when features/typescript3 merges
    US_STATE_DATASET.state_county_map_dataset[stateId].county_dataset,
    ['county_url_name', countyId],
  );

  if (!countyData) {
    // if invalid county entered in URL, redirect to homepage
    window.location.href = '/';
    return;
  }

  const county = countyData.county;
  return `${county}, ${state}`;
}

const SocialIcons = (props: { isMobile: boolean }) => {
  const { isMobile } = props;
  const locationPath = useLocation();
  const isEmbed = useIsEmbed();

  // Don't show in iFrame
  if (isEmbed) return null;

  let match = matchPath<{ id: keyof typeof STATES; county?: string }>(
    locationPath.pathname,
    {
      path: ['/us/:id', '/us/:id/county/:county'],
      exact: true,
      strict: false,
    },
  );

  if (!match) {
    match = matchPath<{ id: keyof typeof STATES }>(locationPath.pathname, {
      path: '/states/:id',
      exact: true,
      strict: false,
    });
  }
  const locationName = locationNameFromMatch(match);

  const shareURL = urls.addSharingId(
    `https://covidactnow.org${match ? match.url : ''}`,
  );
  const hashtag = 'COVIDActNow';
  const locationShareTitle = `I'm keeping track of ${locationName}'s COVID data and risk level with @CovidActNow. What does your community look like?`;
  const defaultShareTitle =
    'I’m keeping track of the latest COVID data and risk levels with @CovidActNow. What does your community look like?';

  const shareTitle = locationName ? locationShareTitle : defaultShareTitle;

  return (
    <Fragment>
      {!isMobile && (
        <Fragment>
          <FacebookShareButton
            url={shareURL}
            quote={shareTitle}
            beforeOnClick={() => {
              trackShare('facebook');
              return Promise.resolve();
            }}
            style={{
              alignItems: 'center',
              display: 'flex',
              paddingLeft: 28,
              paddingRight: 14,
            }}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareURL}
            title={shareTitle}
            hashtags={[hashtag]}
            beforeOnClick={() => {
              trackShare('twitter');
              return Promise.resolve();
            }}
            style={{ alignItems: 'center', display: 'flex' }}
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </Fragment>
      )}
      {isMobile && (
        <Fragment>
          <FacebookShareButton
            url={shareURL}
            title={shareTitle}
            style={{ alignItems: 'center', display: 'flex', paddingRight: 8 }}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareURL}
            title={shareTitle}
            hashtags={[hashtag]}
            style={{ alignItems: 'center', display: 'flex' }}
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SocialIcons;
