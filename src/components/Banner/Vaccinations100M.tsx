import React from 'react';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import { OutlinedButton } from 'components/ButtonSystem';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import {
  BannerContainer,
  InnerContainer,
  Body,
  ButtonsContainer,
} from './Vaccinations100M.style';

const url = 'https://covidactnow.org';
const quote = `Over 100M people in the US have received at least one dose of a COVID vaccine! Stay safe and let’s keep it up so we can all get back to normal as soon as possible.`;
const hashtag = 'COVIDActNow';

const trackShareFacebook = () => {
  trackEvent(
    EventCategory.HOMEPAGE_BANNER,
    EventAction.SHARE,
    'Facebook: 100M Vaccines',
  );
};

const trackShareTwitter = () => {
  trackEvent(
    EventCategory.HOMEPAGE_BANNER,
    EventAction.SHARE,
    'Twitter: 100M Vaccines',
  );
};

const Vaccinations100M: React.FC = () => {
  return (
    <BannerContainer>
      <InnerContainer>
        <Body>
          <strong>
            Over 100M people in the US have received at least one dose of a
            COVID vaccine!
          </strong>
          <span role="img" aria-label="party popper">
            {' 🎉 '}
          </span>
          <span>
            Stay safe and let’s keep it up so we can all get back to normal as
            soon as possible.
          </span>
        </Body>
        <ButtonsContainer>
          <OutlinedButton
            as={FacebookShareButton}
            url={url}
            quote={quote}
            hashtag={hashtag}
            onClick={trackShareFacebook}
            resetButtonStyle={false}
          >
            Share on Facebook
          </OutlinedButton>
          <OutlinedButton
            as={TwitterShareButton}
            url={url}
            title={quote}
            hashtags={[hashtag]}
            onClick={trackShareTwitter}
            resetButtonStyle={false}
          >
            Share on Twitter
          </OutlinedButton>
        </ButtonsContainer>
      </InnerContainer>
    </BannerContainer>
  );
};

export default Vaccinations100M;
