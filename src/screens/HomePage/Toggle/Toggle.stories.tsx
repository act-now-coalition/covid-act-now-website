import React from 'react';
import Toggle from './Toggle';

export default {
  title: 'Shared Components/HomepageToggle',
  component: Toggle,
};

export const HomepageToggle = () => {
  return <Toggle showCounties={true} onClickSwitch={() => {}} />;
};
