import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import {
  ShareButtonContainer,
  ShareContainer,
  ShareInstruction,
  ShareSpacer,
} from './../ModelPage.style';
import { STATES } from 'enums';

const ShareModelBlock = ({ location, county }) => {
  const locationName = STATES[location];
  const countyName = county && county.county;
  const displayName = countyName
    ? `${countyName}, ${locationName}`
    : locationName;
  const shareURL = `https://covidactnow.org/state/${location}`;
  const shareQuote = `This is the point of no return for intervention to prevent ${locationName}'s hospital system from being overloaded by Coronavirus: `;
  const hashtag = 'COVIDActNow';
  const trackShare = target => {
    window.gtag('event', 'share', {
      event_label: target,
    });
  };

  return (
    <ShareContainer>
      <ShareInstruction>{`Share ${displayName}'s COVID-19 trends:`}</ShareInstruction>
      <ShareButtonContainer>
        <FacebookShareButton
          url={shareURL}
          quote={shareQuote}
          beforeOnClick={() => {
            trackShare('facebook');
          }}
        >
          <FacebookIcon size={40} round={false} borderRadius={5} />
        </FacebookShareButton>

        <ShareSpacer />

        <TwitterShareButton
          url={shareURL}
          title={shareQuote}
          hashtags={[hashtag]}
          beforeOnClick={() => {
            trackShare('twitter');
          }}
        >
          <TwitterIcon size={40} round={false} borderRadius={5} />
        </TwitterShareButton>

        <ShareSpacer />

        <LinkedinShareButton
          url={shareURL}
          title={shareQuote}
          hashtags={[hashtag]}
          beforeOnClick={() => {
            trackShare('linkedin');
          }}
        >
          <LinkedinIcon size={40} round={false} borderRadius={5} />
        </LinkedinShareButton>
      </ShareButtonContainer>
    </ShareContainer>
  );
};
export default ShareModelBlock;
