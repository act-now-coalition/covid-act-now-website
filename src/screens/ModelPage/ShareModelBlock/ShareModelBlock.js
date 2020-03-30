import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import { ShareContainer, ShareSpacer } from './../ModelPage.style';
import Callout from 'components/Callout/Callout';
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

  return (
    <Callout borderColor="black">
      <ShareContainer>
        <div
          style={{ paddingRight: 28, fontWeight: 'bold' }}
        >{`Share ${displayName}'s COVID-19 trends:`}</div>

        <FacebookShareButton url={shareURL} quote={shareQuote}>
          <FacebookIcon size={40} round={false} borderRadius={5} />
        </FacebookShareButton>

        <ShareSpacer />

        <TwitterShareButton
          url={shareURL}
          title={shareQuote}
          hashtags={[hashtag]}
        >
          <TwitterIcon size={40} round={false} borderRadius={5} />
        </TwitterShareButton>

        <ShareSpacer />

        <LinkedinShareButton
          url={shareURL}
          title={shareQuote}
          hashtags={[hashtag]}
        >
          <LinkedinIcon size={40} round={false} borderRadius={5} />
        </LinkedinShareButton>
      </ShareContainer>
    </Callout>
  );
};
export default ShareModelBlock;
