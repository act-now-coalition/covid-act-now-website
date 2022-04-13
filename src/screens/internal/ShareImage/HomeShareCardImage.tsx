import React from 'react';
import SocialLocationPreviewMap from 'components/SocialLocationPreview/SocialLocationPreviewMap';
import { ShareCardWrapper } from './ShareCardImage.style';
import { ScreenshotWrapper } from './ShareImage.style';
import { SCREENSHOT_CLASS } from 'components/Screenshot';

/**
 * Screen that just shows the appropriate share card so that we can take a
 * screenshot that we then use as our OpenGraph image.
 */
const HomeShareCardImage = () => {
  return (
    <ScreenshotWrapper className={SCREENSHOT_CLASS}>
      <ShareCardWrapper isHomePage>
        <SocialLocationPreviewMap isRiskMap />
      </ShareCardWrapper>
    </ScreenshotWrapper>
  );
};

export default HomeShareCardImage;
