import React from 'react';

import { LevelInfo } from 'enums/zones';
import { SignalStatusWrapper } from './SignalStatus.style';

const SignalStatus = (props: { levelInfo: LevelInfo }) => {
  return (
    <SignalStatusWrapper color={props.levelInfo.color}>
      {props.levelInfo.name}
    </SignalStatusWrapper>
  );
};

export default SignalStatus;
