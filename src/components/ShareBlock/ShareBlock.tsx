import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import SocialLocationPreview from 'components/SocialLocationPreview/SocialLocationPreview';
import SocialLocationPreviewMap from 'components/SocialLocationPreview/SocialLocationPreviewMap';
import { Projections } from 'common/models/Projections';
import { COLOR_MAP } from 'common/colors';
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import * as urls from 'common/urls';
import { useModelLastUpdatedDate } from 'common/utils/model';
import {
  ShareButtonContainer,
  ShareContainer,
  ShareInstructionHeader,
  ShareInstructionBody,
  StyledShareButton,
  ShareRow,
  ShareRowContentArea,
  SocialMockupWrapper,
  SocialTextArea,
  SocialTextAreaWrapper,
  EmbedPrompt,
} from './ShareBlock.style';
import { trackShare } from 'components/Analytics';
import { Region } from 'common/regions';
import { matchPath, useLocation } from 'common/utils/router';
import EmailAlertsFooter from 'components/EmailAlertsFooter';
import { getDefaultRegions } from 'components/EmailAlertsForm/utils';
import { useGeolocationRegions } from 'common/hooks';

const ShareBlock = ({
  region,
  shareQuote,
  shareURL,
  onClickEmbed,
  projections,
}: {
  region?: Region;
  shareQuote?: string;
  shareURL?: string;
  onClickEmbed?: any;
  projections?: Projections;
}) => {
  const locationPath = useLocation();
  const url = urls.addSharingId(shareURL || 'https://covidactnow.org/');
  const quote =
    shareQuote ||
    'I’m keeping track of the latest COVID data and risk levels with @CovidActNow. What does your community look like?';
  const hashtag = 'COVIDActNow';

  const isMatchingProjectionsRoute = matchPath<{
    id: string;
    county?: string;
  }>(locationPath.pathname, {
    path: [
      '/us/:stateId',
      '/us/:stateId/county/:countyId',
      '/embed/us/:stateId',
      '/embed/us/:stateId/county/:countyId',
    ],
    exact: true,
    strict: false,
  });

  const geolocatedRegions = useGeolocationRegions();

  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? lastUpdatedDate.toLocaleDateString() : '';

  let socialPreview = null;
  if (region && projections) {
    const stats = projections.getMetricValues();
    const alarmLevel = projections.getAlarmLevel();
    const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
    const fillColor =
      alarmLevel !== Level.UNKNOWN ? levelInfo.color : COLOR_MAP.GRAY.LIGHT;
    socialPreview = (
      <SocialLocationPreview
        regionName={region.name}
        fillColor={fillColor}
        levelName={levelInfo.name}
        stats={stats}
        lastUpdatedDateString={lastUpdatedDateString}
      />
    );
  } else {
    socialPreview = (
      <SocialLocationPreviewMap
        isEmbedPreview
        lastUpdatedDateString={lastUpdatedDateString}
      />
    );
  }

  const defaultSignupRegions = region
    ? getDefaultRegions(region)
    : geolocatedRegions;

  return (
    <ShareContainer id="share">
      <EmailAlertsFooter defaultRegions={defaultSignupRegions} />
      <ShareRow newsletter={false}>
        <ShareRowContentArea
          $isMatchingProjectionsRoute={isMatchingProjectionsRoute !== null}
        >
          <SocialTextAreaWrapper id="shareblock">
            <SocialTextArea>
              <ShareInstructionHeader>
                Share COVID risk in your community
              </ShareInstructionHeader>
              <ShareInstructionBody>
                Share real-time, local COVID data with your neighbors, friends,
                and family.
              </ShareInstructionBody>
              <ShareButtonContainer reflow>
                <StyledShareButton variant="contained" color="#3b5998">
                  <FacebookShareButton
                    url={url}
                    quote={quote}
                    beforeOnClick={() => {
                      trackShare('facebook');
                      return Promise.resolve();
                    }}
                  >
                    <FacebookIcon
                      size={40}
                      round={false}
                      bgStyle={{ fill: 'auto' }}
                    />
                  </FacebookShareButton>
                </StyledShareButton>
                <StyledShareButton variant="contained" color="#00acee">
                  <TwitterShareButton
                    url={url}
                    title={quote}
                    hashtags={[hashtag]}
                    beforeOnClick={() => {
                      trackShare('twitter');
                      return Promise.resolve();
                    }}
                  >
                    <TwitterIcon
                      size={40}
                      round={false}
                      bgStyle={{ fill: 'auto' }}
                    />
                  </TwitterShareButton>
                </StyledShareButton>
                <StyledShareButton variant="contained" color="#007fb1">
                  <LinkedinShareButton
                    url={url}
                    title={quote}
                    beforeOnClick={() => {
                      trackShare('linkedin');
                      return Promise.resolve();
                    }}
                  >
                    <LinkedinIcon
                      size={40}
                      round={false}
                      bgStyle={{ fill: 'auto' }}
                    />
                  </LinkedinShareButton>
                </StyledShareButton>
              </ShareButtonContainer>
              <EmbedPrompt>
                Or <span onClick={onClickEmbed}>embed on your website</span>
              </EmbedPrompt>
            </SocialTextArea>
          </SocialTextAreaWrapper>
          <SocialMockupWrapper>{socialPreview}</SocialMockupWrapper>
        </ShareRowContentArea>
      </ShareRow>
    </ShareContainer>
  );
};
export default ShareBlock;
