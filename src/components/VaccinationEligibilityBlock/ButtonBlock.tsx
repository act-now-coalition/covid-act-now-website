import React from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { EventAction, EventCategory } from 'components/Analytics';
import { EmailAlertIcon } from 'components/EmailAlertsFooter/EmailAlertsFooter.style';
import { StyledLinkButton, Wrapper } from './ButtonBlock.style';

const ButtonBlock: React.FC = () => {
  const sharedTrackingProps = {
    trackingCategory: EventCategory.VACCINATION,
    trackingAction: EventAction.CLICK_LINK,
  };

  return (
    <Wrapper>
      <StyledLinkButton
        to="#shareContainer"
        {...sharedTrackingProps}
        trackingLabel="Vaccination alerts"
        startIcon={<EmailAlertIcon />}
        aria-label="Vaccination alerts signup"
      >
        Get notified when eligibility changes
      </StyledLinkButton>
      <StyledLinkButton
        href="/" // Fill this in
        {...sharedTrackingProps}
        trackingLabel="Where to get vaccinated"
        endIcon={<OpenInNewIcon />}
        aria-label="Vaccination information"
      >
        See where and how to get vaccinated
      </StyledLinkButton>
    </Wrapper>
  );
};

export default ButtonBlock;
