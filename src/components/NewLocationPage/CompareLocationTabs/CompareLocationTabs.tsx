import React, { useState } from 'react';
import { ButtonGroup, Button } from './CompareLocationTabs.style';

const CompareLocationTabs: React.FC = () => {
  const [alignment, setAlignment] = useState<string | null>('left');
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <ButtonGroup value={alignment} exclusive onChange={handleAlignment}>
      <Button value="left" aria-label="left aligned">
        Nearby
      </Button>
      <Button value="center" aria-label="centered">
        TX
      </Button>
      <Button value="right" aria-label="right aligned">
        USA
      </Button>
    </ButtonGroup>
  );
};

export default CompareLocationTabs;
