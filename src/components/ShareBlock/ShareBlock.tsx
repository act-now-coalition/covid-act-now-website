import React from 'react';
import { matchPath, useLocation } from 'react-router-dom';
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
import { STATES } from 'common';

const ShareBlock = ({
  condensed,
  stateId,
  countyName,
  shareQuote,
  shareURL,
  shareInstruction,
  newsletterInstruction,
  onClickEmbed,
  projections,
  stats,
}: {
  condensed?: boolean;
  stateId?: string;
  countyName?: String;
  shareQuote?: string;
  shareURL?: string;
  shareInstruction?: string;
  newsletterInstruction?: string;
  onClickEmbed?: any;
  projections?: Projections;
  stats?: { [key: string]: number | null };
}) => {
  const locationPath = useLocation();

  const url = urls.addSharingId(shareURL || 'https://covidactnow.org/');
  const quote =
    shareQuote ||
    '@CovidActNow has real-time COVID data and risk levels for all communities across the country. What does yours look like?';
  const hashtag = 'COVIDActNow';

  const trackShare = (target: string) => {
    window.gtag('event', 'share', {
      event_label: target,
    });
  };

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
      <ShareRow newsletter={true}>
        <ShareRowContentArea
          isMatchingProjectionsRoute={isMatchingProjectionsRoute !== null}
        >
          <NewsletterMockupWrapper>
            <NewsletterMockup />
          </NewsletterMockupWrapper>
          <NewsletterTextArea>
            <ShareInstructionHeader>
              Receive daily updates
            </ShareInstructionHeader>
            <ShareInstructionBody>
              We’ll email you fresh data and high-quality news related to
              COVID-19.
            </ShareInstructionBody>
            <Newsletter county={countyName} stateId={stateId} />
          </NewsletterTextArea>
        </ShareRowContentArea>
      </ShareRow>
      <ShareRow newsletter={false}>
        <ShareRowContentArea
          isMatchingProjectionsRoute={isMatchingProjectionsRoute !== null}
        >
          <SocialTextAreaWrapper>
            <SocialTextArea>
              <ShareInstructionHeader>
                Share COVID risk in your community
              </ShareInstructionHeader>
              <ShareInstructionBody>
                Share real-time, local COVID data with your neighbors, friends,
                and family.
              </ShareInstructionBody>
              <ShareButtonContainer reflow>
                <StyledShareButton
                  disableElevation
                  variant="contained"
                  color="#3b5998"
                >
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
                <StyledShareButton
                  disableElevation
                  variant="contained"
                  color="#00acee"
                >
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
                <StyledShareButton
                  disableElevation
                  variant="contained"
                  color="#007fb1"
                >
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
                {isMatchingProjectionsRoute ? (
                  <>
                    Or <span onClick={onClickEmbed}>embed on your website</span>
                  </>
                ) : (
                  <>&nbsp;</>
                )}
              </EmbedPrompt>
            </SocialTextArea>
          </SocialTextAreaWrapper>
          <SocialMockupWrapper>
            <SocialLocationPreview projections={projections} stats={stats} />
          </SocialMockupWrapper>
        </ShareRowContentArea>
      </ShareRow>
    </ShareContainer>
  );
};
export default ShareBlock;
