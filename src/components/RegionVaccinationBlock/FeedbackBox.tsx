import React from 'react';
import { FeedbackBox as BoxContainer } from './RegionVaccinationBlock.style';
import ExternalLink from 'components/ExternalLink';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';

const FeedbackBox: React.FC = () => {
  return (
    <BoxContainer>
      <ExternalLink
        href="https://forms.gle/saHnT8RtDGqRaHHD8"
        onClick={trackFeedbackClick}
      >
        Suggest an improvement
      </ExternalLink>
    </BoxContainer>
  );
};

function trackFeedbackClick() {
  trackEvent(
    EventCategory.VACCINATION,
    EventAction.CLICK_LINK,
    'Suggest and improvement',
  );
}

export default FeedbackBox;
