import React from 'react';
import {
  Experiment as OptimizeExperiment,
  ExperimentProps as OptimizeExperimentProps,
} from 'react-optimize';

export enum ExperimentID {
  DONATE_BTN_COLOR = 'P_IiKCRHSGCFqFQaEThuDw',
}

export type ExperimentProps = Omit<OptimizeExperimentProps, 'id'> & {
  id: ExperimentID;
};

const Experiment: React.FC<ExperimentProps> = props => {
  const { id, ...otherProps } = props;
  return <OptimizeExperiment id={id} {...otherProps} />;
};

export default Experiment;
