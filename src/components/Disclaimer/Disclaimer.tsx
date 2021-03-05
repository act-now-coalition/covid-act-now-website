import React from 'react';
import { DisclaimerWrapper } from './Disclaimer.style';

const Disclaimer = ({ disclaimerContent }: { disclaimerContent: any }) => {
  return <DisclaimerWrapper>{disclaimerContent}</DisclaimerWrapper>;
};

export default Disclaimer;
