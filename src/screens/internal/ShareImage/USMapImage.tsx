import { SCREENSHOT_CLASS } from 'components/Screenshot';
import SocialLocationPreviewMap from 'components/SocialLocationPreview/SocialLocationPreviewMap';
import React from 'react';
import { ScreenshotWrapper } from './ShareImage.style';
import { USMapWrapper } from './USMapImage.style';

export const USMapImage = () => {
  return (
    <ScreenshotWrapper className={SCREENSHOT_CLASS}>
      <USMapWrapper>
        <SocialLocationPreviewMap />
      </USMapWrapper>
    </ScreenshotWrapper>
  );
};
