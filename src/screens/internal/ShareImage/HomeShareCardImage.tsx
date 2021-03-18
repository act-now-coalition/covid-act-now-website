import React from 'react';
import SocialLocationPreview from 'components/SocialLocationPreview/SocialLocationPreview';
import { ShareCardWrapper } from './ShareCardImage.style';
import { DarkScreenshotWrapper } from './ShareImage.style';
import { SCREENSHOT_CLASS } from 'components/Screenshot';
import { Header } from './LocationShareCardImage';

/**
 * Screen that just shows the appropriate share card so that we can take a
 * screenshot that we then use as our OpenGraph image.
 */
const HomeShareCardImage = () => {
  return (
    <DarkScreenshotWrapper className={SCREENSHOT_CLASS}>
      <Header isHomePage />
      <ShareCardWrapper isHomePage>
        <SocialLocationPreview />;
      </ShareCardWrapper>
    </DarkScreenshotWrapper>
  );
};

export default HomeShareCardImage;
