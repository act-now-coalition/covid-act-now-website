import React from 'react';
import SocialLocationPreviewMap from 'components/SocialLocationPreview/SocialLocationPreviewMap';
import { ShareCardWrapper } from './ShareCardImage.style';
import { DarkScreenshotWrapper } from './ShareImage.style';
import { SCREENSHOT_CLASS } from 'components/Screenshot';
import { Header } from './LocationShareCardImage';

export interface HomeShareCardImageProps {
  lastUpdatedDateString: string;
}
/**
 * Screen that just shows the appropriate share card so that we can take a
 * screenshot that we then use as our OpenGraph image.
 */
const HomeShareCardImage = ({
  lastUpdatedDateString,
}: HomeShareCardImageProps) => {
  return (
    <DarkScreenshotWrapper className={SCREENSHOT_CLASS}>
      <Header isHomePage />
      <ShareCardWrapper isHomePage>
        <SocialLocationPreviewMap
          lastUpdatedDateString={lastUpdatedDateString}
        />
      </ShareCardWrapper>
    </DarkScreenshotWrapper>
  );
};

export default HomeShareCardImage;
