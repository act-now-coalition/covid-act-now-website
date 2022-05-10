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
      href="https://www.cdc.gov/coronavirus/2019-ncov/your-health/covid-by-county.html"
      endIcon={<OpenInNewIcon />}
    >
      Learn More About Community Risk Levels
    </StyledBoosterButton>
  );
};

export default BoosterButton;
