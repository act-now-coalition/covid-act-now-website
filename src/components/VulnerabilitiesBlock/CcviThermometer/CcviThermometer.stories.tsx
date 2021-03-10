import React from 'react';
import CcviThermometer from './CcviThermometer';

export default {
  title: 'Shared Components/Vulnerabilities/CcviThermometer',
  component: CcviThermometer,
};

export const Score00 = () => {
  return <CcviThermometer overallScore={0} regionName="region name" />;
};

export const Score04 = () => {
  return <CcviThermometer overallScore={0.4} regionName="region name" />;
};

export const Score09 = () => {
  return <CcviThermometer overallScore={0.9} regionName="region name" />;
};

export const Score10 = () => {
  return <CcviThermometer overallScore={1.0} regionName="region name" />;
};
