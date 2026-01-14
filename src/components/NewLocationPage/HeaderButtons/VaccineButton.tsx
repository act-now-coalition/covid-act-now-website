import React from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { StyledVaccineButton } from './HeaderButtons.style';
import { EventCategory } from 'components/Analytics';
import { useDynamicVaccineButton } from 'common/hooks';

const VaccineButton: React.FC = () => {
  const showButton = useDynamicVaccineButton();

  return (
    <>
      {showButton && (
        <StyledVaccineButton
          trackingCategory={EventCategory.VACCINATION}
          trackingLabel="Location page header: Find a vaccine"
          href="https://vaccinefinder.org/en"
          endIcon={<OpenInNewIcon />}
        >
          Find a vaccine
        </StyledVaccineButton>
      )}
    </>
  );
};

export default VaccineButton;
