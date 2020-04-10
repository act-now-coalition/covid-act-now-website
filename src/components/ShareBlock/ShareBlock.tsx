import React, { useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import Newsletter from 'components/Newsletter/Newsletter';
import Snackbar from '@material-ui/core/Snackbar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  ShareButtonContainer,
  ShareContainer,
  ShareInstruction,
  StyledShareButton,
  ShareTypeDivider,
} from './ShareBlock.style';

const ShareBlock = ({
  condensed,
  location,
  countyName,
  embedSnippet,
  shareQuote,
  shareURL,
  shareInstruction,
  newsletterInstruction,
}: {
  condensed?: boolean;
  location?: string;
  countyName?: String;
  embedSnippet?: string;
  shareQuote?: string;
  shareURL?: string;
  shareInstruction?: string;
  newsletterInstruction?: string;
}) => {
  const url = shareURL || 'https://covidactnow.org/';
  const quote =
    shareQuote ||
    'See a projection for how long states and counties have until COVID overwhelms hospitals and how interventions flatten the curve and save lives: @COVIDActNow';
  const hashtag = 'COVIDActNow';
  const [embedCopySuccess, setEmbedCopySuccess] = useState(false);
  const trackShare = (target: string) => {
    window.gtag('event', 'share', {
      event_label: target,
    });
  };

  return (
    <ShareContainer condensed={condensed}>
      <ShareInstruction>
        {shareInstruction || 'Share the Covid Act Now map'}
      </ShareInstruction>
      <ShareButtonContainer reflow={!!embedSnippet}>
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

        {embedSnippet && (
          <CopyToClipboard
            text={embedSnippet}
            onCopy={() => setEmbedCopySuccess(true)}
          >
            <StyledShareButton
              disableElevation
              variant="contained"
              color="#616161"
            >
              Embed
            </StyledShareButton>
          </CopyToClipboard>
        )}
      </ShareButtonContainer>

      <ShareTypeDivider />

      <ShareInstruction color="inherit" component="p" variant="subtitle2">
        {newsletterInstruction ||
          'Get the latest updates from the Covid Act Now team'}
      </ShareInstruction>
      <Newsletter county={countyName} location={location} />
      <Snackbar
        message="Embed code copied!"
        open={embedCopySuccess}
        autoHideDuration={3000}
        onClose={() => setEmbedCopySuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </ShareContainer>
  );
};
export default ShareBlock;
