import React from 'react';

import { Status } from 'enums/status';
import { SignalStatusWrapper } from './SignalStatus.style';

const SignalStatus = (props: { status: Status }) => {
  return (
    <SignalStatusWrapper color={props.status.color}>
      {props.status.details}
    </SignalStatusWrapper>
  );
};

export default SignalStatus;
