import React from 'react';
import CcviThermometer from './CcviThermometer';

export default {
  title: 'Shared Components/Vulnerabilities/CcviThermometer',
  component: CcviThermometer,
};

export const Score00 = () => {
  return <CcviThermometer overallScore={0} />;
};

export const Score04 = () => {
  return <CcviThermometer overallScore={0.4} />;
};

export const Score09 = () => {
  return <CcviThermometer overallScore={0.9} />;
};

export const Score10 = () => {
  return <CcviThermometer overallScore={1.0} />;
};
