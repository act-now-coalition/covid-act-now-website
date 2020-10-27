import React from 'react';
import {
  Experiment as OptimizeExperiment,
  ExperimentProps as OptimizeExperimentProps,
} from 'react-optimize';

export enum ExperimentID {
  DONATE_OCT27 = 'D1PEuXIuQ6KS9VEGeTC19w',
}

export type ExperimentProps = Omit<OptimizeExperimentProps, 'id'> & {
  id: ExperimentID;
};

const Experiment: React.FC<ExperimentProps> = props => {
  const { id, ...otherProps } = props;
  return <OptimizeExperiment id={id} {...otherProps} />;
};

export default Experiment;
