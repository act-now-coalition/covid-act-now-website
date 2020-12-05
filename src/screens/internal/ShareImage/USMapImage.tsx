import { SCREENSHOT_CLASS } from 'components/Screenshot';
import SocialLocationPreview from 'components/SocialLocationPreview/SocialLocationPreview';
import React from 'react';
import { ScreenshotWrapper } from './ShareImage.style';
import { USMapWrapper } from './USMapImage.style';

export const USMapImage = () => {
  return (
    <ScreenshotWrapper className={SCREENSHOT_CLASS}>
      <USMapWrapper>
        <SocialLocationPreview />
      </USMapWrapper>
    </ScreenshotWrapper>
  );
};
