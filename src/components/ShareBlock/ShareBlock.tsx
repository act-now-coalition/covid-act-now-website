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
import {
  ShareButtonContainer,
  ShareContainer,
  ShareInstruction,
  StyledShareButton,
  ShareTypeDivider,
} from './ShareBlock.style';
import { STATES } from 'enums';

const ShareBlock = ({
  condensed,
  centered,
  stateId,
  countyName,
  shareQuote,
  shareURL,
  shareInstruction,
  newsletterInstruction,
  onClickEmbed,
}: {
  condensed?: boolean;
  centered?: boolean;
  stateId?: string;
  countyName?: String;
  shareQuote?: string;
  shareURL?: string;
  shareInstruction?: string;
  newsletterInstruction?: string;
  onClickEmbed?: any;
}) => {
  const locationPath = useLocation();

  const url = shareURL || 'https://covidactnow.org/';
  const quote =
    shareQuote ||
    '@CovidActNow has real-time modeling and metrics to help America reopen safely. Check it out:';
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
    <ShareContainer condensed={condensed} centered={centered}>
      <ShareInstruction>
        {shareInstruction || 'Share the Covid Act Now map'}
      </ShareInstruction>
      <ShareButtonContainer reflow>
        <StyledShareButton disableElevation variant="contained" color="#3b5998">
          <FacebookShareButton
            url={url}
            quote={quote}
            beforeOnClick={() => {
              trackShare('facebook');
              return Promise.resolve();
            }}
          >
            <FacebookIcon size={40} round={false} bgStyle={{ fill: 'auto' }} />
          </FacebookShareButton>
        </StyledShareButton>
        <StyledShareButton disableElevation variant="contained" color="#00acee">
          <TwitterShareButton
            url={url}
            title={quote}
            hashtags={[hashtag]}
            beforeOnClick={() => {
              trackShare('twitter');
              return Promise.resolve();
            }}
          >
            <TwitterIcon size={40} round={false} bgStyle={{ fill: 'auto' }} />
          </TwitterShareButton>
        </StyledShareButton>
        <StyledShareButton disableElevation variant="contained" color="#007fb1">
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
            <LinkedinIcon size={40} round={false} bgStyle={{ fill: 'auto' }} />
          </LinkedinShareButton>
        </StyledShareButton>
        {isMatchingProjectionsRoute && (
          <StyledShareButton
            disableElevation
            variant="contained"
            color="#616161"
            onClick={onClickEmbed}
          >
            Embed
          </StyledShareButton>
        )}
      </ShareButtonContainer>

      <ShareTypeDivider />

      <ShareInstruction color="inherit" component="p" variant="subtitle2">
        {newsletterInstruction ||
          'Get the latest updates from the Covid Act Now team'}
      </ShareInstruction>
      <Newsletter county={countyName} stateId={stateId} />
    </ShareContainer>
  );
};
export default ShareBlock;
