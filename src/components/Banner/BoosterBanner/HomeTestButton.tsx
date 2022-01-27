import React from 'react';
import { EventCategory, EventAction } from 'components/Analytics';
import { StyledHomeTestButton } from './Buttons.style';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const HomeTestButton: React.FC = () => {
  return (
    <StyledHomeTestButton
      trackingCategory={EventCategory.HOMEPAGE_BANNER}
      trackingAction={EventAction.CLICK}
      trackingLabel="Home page banner: Order at-home tests"
      href="https://www.covidtests.gov/"
      endIcon={<OpenInNewIcon />}
    >
      Order free at-home tests
    </StyledHomeTestButton>
  );
};

export default HomeTestButton;
