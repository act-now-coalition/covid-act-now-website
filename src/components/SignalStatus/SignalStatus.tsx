import React from 'react';

import { ZoneInfo } from 'enums/zones';
import { SignalStatusWrapper } from './SignalStatus.style';

const SignalStatus = (props: { zoneInfo: ZoneInfo }) => {
  return (
    <SignalStatusWrapper color={props.zoneInfo.color}>
      {props.zoneInfo.name}
    </SignalStatusWrapper>
  );
};

export default SignalStatus;
