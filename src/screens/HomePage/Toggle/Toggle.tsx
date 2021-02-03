import React from 'react';
import { SwitchComponent } from 'components/SharedComponents';
import { Wrapper } from './Toggle.style';

const Toggle: React.FC<{
  showCounties: boolean;
  onClickSwitch: (newValue: boolean) => void;
}> = ({ showCounties, onClickSwitch }) => {
  return (
    <Wrapper>
      <SwitchComponent
        leftLabel="States"
        rightLabel="Counties"
        checked={showCounties}
        onChange={onClickSwitch}
      />
    </Wrapper>
  );
};

export default Toggle;
