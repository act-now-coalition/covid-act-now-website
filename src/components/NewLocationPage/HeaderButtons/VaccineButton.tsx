import React from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { VaccineButtonWrapper as Wrapper } from './HeaderButtons.style';
import { LargeFilledButton } from 'components/ButtonSystem';
import { EventCategory } from 'components/Analytics';
import { useDynamicVaccineButton } from 'common/hooks';

const VaccineButton: React.FC = () => {
  const showButton = useDynamicVaccineButton();

  return (
    <>
      {showButton && (
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
      )}
    </>
  );
};

export default VaccineButton;
