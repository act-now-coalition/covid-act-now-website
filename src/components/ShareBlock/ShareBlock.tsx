import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import { matchPath, useLocation } from 'react-router';

import { filterGeolocatedRegions, Region } from 'common/regions';
import { useGeolocatedRegions } from 'common/hooks';
import SocialLocationPreview from 'components/SocialLocationPreview/SocialLocationPreview';
import SocialLocationPreviewMap from 'components/SocialLocationPreview/SocialLocationPreviewMap';
import { Projections } from 'common/models/Projections';
import * as urls from 'common/urls';
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
import EmailAlertsFooter from 'components/EmailAlertsFooter';
import { getDefaultRegions } from 'components/EmailAlertsForm/utils';

const ShareBlock = ({
  region,
  shareQuote,
  shareURL,
  onClickEmbed,
  projections,
  stats,
}: {
  region?: Region;
  shareQuote?: string;
  shareURL?: string;
  onClickEmbed?: any;
  projections?: Projections;
  stats?: { [key: string]: number | null };
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

  const { userRegions } = useGeolocatedRegions();
  const geolocatedRegions = filterGeolocatedRegions(userRegions);

  const defaultSignupRegions = region
    ? getDefaultRegions(region)
    : geolocatedRegions;

  const SocialPreview =
    projections && stats ? (
      <SocialLocationPreview projections={projections} stats={stats} />
    ) : (
      <SocialLocationPreviewMap isEmbedPreview />
    );

  return (
    <ShareContainer id="share">
      <EmailAlertsFooter defaultRegions={defaultSignupRegions} />
      {!region && (
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
                  Share real-time, local COVID data with your neighbors,
                  friends, and family.
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
                </ShareButtonContainer>
                <EmbedPrompt>
                  Or <span onClick={onClickEmbed}>embed on your website</span>
                </EmbedPrompt>
              </SocialTextArea>
            </SocialTextAreaWrapper>
            <SocialMockupWrapper>{SocialPreview}</SocialMockupWrapper>
          </ShareRowContentArea>
        </ShareRow>
      )}
    </ShareContainer>
  );
};
export default ShareBlock;
