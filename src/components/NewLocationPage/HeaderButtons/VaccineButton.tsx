import React from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { VaccineButtonWrapper as Wrapper } from './HeaderButtons.style';
import { LargeFilledButton } from 'components/ButtonSystem';
import { EventCategory } from 'components/Analytics';

const VaccineButton: React.FC = () => {
  return (
    <Wrapper>
      <LargeFilledButton
        trackingCategory={EventCategory.VACCINATION}
        trackingLabel="Location page header: Find a vaccine"
        href="https://vaccinefinder.org/search/"
        endIcon={<OpenInNewIcon />}
      >
        Find a vaccine
      </LargeFilledButton>
    </Wrapper>
  );
};

export default VaccineButton;
