import React from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { EventAction, EventCategory } from 'components/Analytics';
import { EmailAlertIcon } from 'components/EmailAlertsFooter/EmailAlertsFooter.style';
import { StyledLinkButton, ButtonsContainer } from './ButtonBlock.style';

const ButtonBlock: React.FC<{ signupLink?: string | null }> = ({
  signupLink,
}) => {
  const sharedTrackingProps = {
    trackingCategory: EventCategory.VACCINATION,
    trackingAction: EventAction.CLICK_LINK,
  };

  return (
    <ButtonsContainer>
      <StyledLinkButton
        to="#share-container"
        {...sharedTrackingProps}
        trackingLabel="Vaccination alerts"
        startIcon={<EmailAlertIcon />}
      >
        Get notified when eligibility changes
      </StyledLinkButton>
      {signupLink && (
        <StyledLinkButton
          href={signupLink}
          {...sharedTrackingProps}
          trackingLabel="Where to get vaccinated"
          endIcon={<OpenInNewIcon />}
        >
          See where and how to get vaccinated
        </StyledLinkButton>
      )}
    </ButtonsContainer>
  );
};

export default ButtonBlock;
