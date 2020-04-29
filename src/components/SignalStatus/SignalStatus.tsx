import React from 'react';

import { Level } from 'enums/zones';
import { LevelInfo } from 'enums/zones';
import { SignalStatusWrapper } from './SignalStatus.style';
import TildeIcon from 'assets/images/tildeIcon';
import CheckIcon from 'assets/images/checkIcon';
import ExclamationIcon from 'assets/images/exclamationIcon';
import QuestionIcon from 'assets/images/questionIcon';

const getIcon = function(levelInfo: LevelInfo) {
  switch(levelInfo.level) {
    case Level.LOW:
      return (<CheckIcon textColor={levelInfo.color} />);
    case Level.MEDIUM:
      return (<TildeIcon textColor={levelInfo.color} />);
    case Level.HIGH:
      return (<ExclamationIcon textColor={levelInfo.color} />);
    case Level.UNKNOWN:
      return (<QuestionIcon textColor={levelInfo.color} />);
  }
}

const SignalStatus = (props: { levelInfo: LevelInfo }) => {
  return (
    <SignalStatusWrapper color={props.levelInfo.color}>
      {getIcon(props.levelInfo)}
      <span>{props.levelInfo.name}</span>
    </SignalStatusWrapper>
  );
};

export default SignalStatus;
