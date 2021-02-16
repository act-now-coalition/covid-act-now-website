import { SCREENSHOT_CLASS } from 'components/Screenshot';
import SocialLocationPreviewMap from 'components/SocialLocationPreview/SocialLocationPreviewMap';
import React from 'react';
import { ScreenshotWrapper } from './ShareImage.style';
import { USMapWrapper } from './USMapImage.style';

export interface USMapImageProps {
  lastUpdatedDateString: string;
}

export const USMapImage = ({ lastUpdatedDateString }: USMapImageProps) => {
  return (
    <ScreenshotWrapper className={SCREENSHOT_CLASS}>
      <USMapWrapper>
        <SocialLocationPreviewMap
          lastUpdatedDateString={lastUpdatedDateString}
        />
      </USMapWrapper>
    </ScreenshotWrapper>
  );
};
