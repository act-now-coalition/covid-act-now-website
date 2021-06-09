import React, { useState } from 'react';
import { ButtonGroup, Button } from './CompareLocationTabs.style';

const CompareLocationTabs: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('VT');
  const handleSelectedOption = (
    event: React.MouseEvent<HTMLElement>,
    newSelection: string,
  ) => {
    setSelectedOption(newSelection);
  };
  return (
    <ButtonGroup
      value={selectedOption}
      exclusive
      onChange={handleSelectedOption}
    >
      <Button value={'Nearby'}>Nearby</Button>
      <Button value={'VT'}>VT</Button>
      <Button value={'USA'}>USA</Button>
    </ButtonGroup>
  );
};

export default CompareLocationTabs;
