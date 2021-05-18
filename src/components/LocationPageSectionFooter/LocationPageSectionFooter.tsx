import React from 'react';
import { Wrapper } from './LocationPageSectionFooter.style';
import ShareButtons from 'components/SharedComponents/ShareButtons';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

const LocationPageSectionFooter: React.FC = ({ children }) => {
  return (
    <>
      <Wrapper>{children}</Wrapper>
      <ShareButtons
        eventCategory={EventCategory.RECOMMENDATIONS}
        shareUrl={'...'}
        shareQuote={'...'}
      />
    </>
  );
};

export default LocationPageSectionFooter;
