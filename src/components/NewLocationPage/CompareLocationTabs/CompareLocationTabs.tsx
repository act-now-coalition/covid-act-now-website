import React, { useState } from 'react';
import { ButtonGroup, Button } from './CompareLocationTabs.style';

const CompareLocationTabs: React.FC<{
  locationLevels: Array<string>;
  onChange: (
    event: React.MouseEvent<HTMLElement>,
    newSelection: string,
  ) => void;
  selectedOption: string;
}> = ({ locationLevels, onChange, selectedOption }) => {
  return (
    <ButtonGroup value={selectedOption} exclusive onChange={onChange}>
      {locationLevels.map(locationLevel => (
        <Button value={locationLevel}>{locationLevel}</Button>
      ))}
    </ButtonGroup>
  );
};

export default CompareLocationTabs;
