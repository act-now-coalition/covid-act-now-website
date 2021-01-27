import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import Newsletter from 'components/Newsletter/Newsletter';
import SocialLocationPreview from 'components/SocialLocationPreview/SocialLocationPreview';
import { Projections } from 'common/models/Projections';
import * as urls from 'common/urls';
import NewsletterMockup from 'assets/images/newsletterMockup';
import {
  ShareButtonContainer,
  ShareContainer,
  ShareInstructionHeader,
  ShareInstructionBody,
  StyledShareButton,
  ShareRow,
  ShareRowContentArea,
  NewsletterMockupWrapper,
  SocialMockupWrapper,
  NewsletterTextArea,
  SocialTextArea,
  SocialTextAreaWrapper,
  EmbedPrompt,
} from './ShareBlock.style';
import { trackShare } from 'components/Analytics';
import { Region } from 'common/regions';
import { STATES } from 'common';
import { matchPath, useLocation } from 'react-router';

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
    id: keyof typeof STATES;
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

  return (
    <ShareContainer>
      <ShareRow newsletter>
        <ShareRowContentArea
          isMatchingProjectionsRoute={isMatchingProjectionsRoute !== null}
        >
          <NewsletterMockupWrapper>
            <NewsletterMockup />
          </NewsletterMockupWrapper>
          <NewsletterTextArea>
            <ShareInstructionHeader $alertsInstructions>
              Receive Alerts
            </ShareInstructionHeader>
            <ShareInstructionBody $alertsInstructions>
              We'll email you when your state or county sees a significant
              change in one of their metrics and overall risk score.
            </ShareInstructionBody>
            <Newsletter region={region} />
          </NewsletterTextArea>
        </ShareRowContentArea>
      </ShareRow>
      <ShareRow newsletter={false}>
        <ShareRowContentArea
          isMatchingProjectionsRoute={isMatchingProjectionsRoute !== null}
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
                    // @ts-ignore: seems to not be available for linkedin?
                    hashtags={[hashtag]}
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
          <SocialMockupWrapper>
            <SocialLocationPreview
              isEmbedPreview
              projections={projections}
              stats={stats}
            />
          </SocialMockupWrapper>
        </ShareRowContentArea>
      </ShareRow>
    </ShareContainer>
  );
};
export default ShareBlock;
