import React from 'react';

import { Level, LevelInfo } from 'common/level';
import { SignalStatusWrapper } from './SignalStatus.style';
import TildeIcon from 'assets/images/tildeIcon';
import CheckIcon from 'assets/images/checkIcon';
import ExclamationIcon from 'assets/images/exclamationIcon';
import QuestionIcon from 'assets/images/questionIcon';

const getIcon = function (levelInfo: LevelInfo, flipOrder?: Boolean) {
  switch (levelInfo.level) {
    case Level.LOW:
      if (flipOrder) return <ExclamationIcon textColor={levelInfo.color} />;
      return <CheckIcon textColor={levelInfo.color} />;
    case Level.MEDIUM:
      if (flipOrder) return <ExclamationIcon textColor={levelInfo.color} />;
      return <TildeIcon textColor={levelInfo.color} />;
    case Level.MEDIUM_HIGH:
      if (flipOrder) return <TildeIcon textColor={levelInfo.color} />;
      return <ExclamationIcon textColor={levelInfo.color} />;
    case Level.HIGH:
      if (flipOrder) return <CheckIcon textColor={levelInfo.color} />;
      return <ExclamationIcon textColor={levelInfo.color} />;
    case Level.UNKNOWN:
      return <QuestionIcon textColor={levelInfo.color} />;
  }
};

const SignalStatus = (props: {
  levelInfo: LevelInfo;
  condensed?: Boolean;
  flipOrder?: Boolean;
}) => {
  return (
    <SignalStatusWrapper
      color={props.levelInfo.color}
      condensed={props.condensed}
    >
      {getIcon(props.levelInfo, props.flipOrder || false)}
      <span>{props.levelInfo.name}</span>
    </SignalStatusWrapper>
  );
};

export default SignalStatus;
