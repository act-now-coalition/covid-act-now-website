import React, { useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import Snackbar from '@material-ui/core/Snackbar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  ShareButtonContainer,
  ShareContainer,
  ShareInstruction,
  ShareSpacer,
  EmbedButton,
} from './../ModelPage.style';
import { STATES } from 'enums';

const ShareModelBlock = ({ location, county, embedSnippet }) => {
  const locationName = STATES[location];
  const countyName = county && county.county;
  const displayName = countyName
    ? `${countyName}, ${locationName}`
    : locationName;
  const shareURL = `https://covidactnow.org/us/${location.toLowerCase()}${
    county ? `/county/${county.county_url_name}` : ''
  }`;
  const shareQuote = `This is the point of no return for intervention to prevent ${displayName}'s hospital system from being overloaded by Coronavirus: `;
  const hashtag = 'COVIDActNow';
  const [embedCopySuccess, setEmbedCopySuccess] = useState(false);
  const trackShare = target => {
    window.gtag('event', 'share', {
      event_label: target,
    });
  };

  return (
    <ShareContainer>
      <ShareInstruction>{`Share ${displayName}'s COVID trends:`}</ShareInstruction>
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

        <ShareSpacer />

        <CopyToClipboard
          text={embedSnippet}
          onCopy={() => setEmbedCopySuccess(true)}
        >
          <EmbedButton variant="contained" disableElevation>
            Embed
          </EmbedButton>
        </CopyToClipboard>
      </ShareButtonContainer>
      <Snackbar
        message="Embed code copied!"
        open={embedCopySuccess}
        autoHideDuratiion={3000}
        onClose={() => setEmbedCopySuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </ShareContainer>
  );
};
export default ShareModelBlock;
