import React from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { StyledBoosterButton } from './Buttons.style';
import { EventCategory, EventAction } from 'components/Analytics';

const BoosterButton: React.FC = () => {
  return (
    <StyledBoosterButton
      trackingCategory={EventCategory.HOMEPAGE_BANNER}
      trackingAction={EventAction.CLICK}
      trackingLabel="Home page banner: Find a booster"
      href="https://www.vaccines.gov/"
      endIcon={<OpenInNewIcon />}
    >
      Find a booster
    </StyledBoosterButton>
  );
};

export default BoosterButton;
