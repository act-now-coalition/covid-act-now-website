import React, { useState } from 'react';
import CompareLocationTabs from './CompareLocationTabs';

export default {
  title: 'Location Page/Compare Location Tabs',
  component: CompareLocationTabs,
};

export const CompareLocationTabsExample = () => {
  const [selectedOption, setSelectedOption] = useState('VT');
  const handleSelectedOption = (
    event: React.MouseEvent<HTMLElement>,
    newSelection: string,
  ) => {
    if (newSelection !== null) {
      setSelectedOption(newSelection);
    }
  };
  return (
    <CompareLocationTabs
      locationLevels={['Nearby', 'VT', 'USA']}
      onChange={handleSelectedOption}
      selectedOption={selectedOption}
    />
  );
};
