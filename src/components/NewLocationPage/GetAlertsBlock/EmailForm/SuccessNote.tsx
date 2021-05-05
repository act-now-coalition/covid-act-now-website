import React from 'react';
import SuccessIcon from 'assets/images/SuccessIcon';
import { Intro } from './EmailForm.style';
import { GrayBodyCopy } from 'components/NewLocationPage/Shared/Shared.style';

const SuccessNote = () => {
  return (
    <Intro>
      <SuccessIcon />
      <GrayBodyCopy>
        You’ll get alerts when the risk level changes in this location.
      </GrayBodyCopy>
    </Intro>
  );
};

export default SuccessNote;
