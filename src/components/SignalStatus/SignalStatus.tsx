import React from 'react';

import { Level, LevelInfo } from 'enums/levels';
import { SignalStatusWrapper } from './SignalStatus.style';
import TildeIcon from 'assets/images/tildeIcon';
import CheckIcon from 'assets/images/checkIcon';
import ExclamationIcon from 'assets/images/exclamationIcon';
import QuestionIcon from 'assets/images/questionIcon';

const getIcon = function (levelInfo: LevelInfo) {
  switch (levelInfo.level) {
    case Level.LOW:
      return <CheckIcon textColor={levelInfo.color} />;
    case Level.MEDIUM:
      return <TildeIcon textColor={levelInfo.color} />;
    case Level.HIGH:
      return <ExclamationIcon textColor={levelInfo.color} />;
    case Level.UNKNOWN:
      return <QuestionIcon textColor={levelInfo.color} />;
  }
};

const SignalStatus = (props: { levelInfo: LevelInfo; condensed?: Boolean }) => {
  return (
    <SignalStatusWrapper
      color={props.levelInfo.color}
      condensed={props.condensed}
    >
      {getIcon(props.levelInfo)}
      <span>{props.levelInfo.name}</span>
    </SignalStatusWrapper>
  );
};

export default SignalStatus;
