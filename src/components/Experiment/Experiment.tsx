import React from 'react';
import {
  Experiment as OptimizeExperiment,
  ExperimentProps as OptimizeExperimentProps,
} from 'react-optimize';

/**
 * Google Optimize provides a UI to define A/B tests and takes care of
 * assigning users (browser sessions) to each variant in the experiment.
 * The process to setup an experiment is as follows:
 *
 * 1. Create an experiment in Google Optimize
 *   - name the experiment
 *   - define the variants in the UI
 * 2. define objective (page views, events or custom)
 * 3. copy the experiment ID and add it below
 * 4. Implement the variants in the code. The default will be A, the variant
 *    will be B.
 * 5. Once the code with the experiment is deployed, start the experiment in
 *    Google Optimize. Optimize will show results and let us know which
 *    version is better.
 * 6. Finish the experiment
 * 7. Remove the experiment code and keep the successful version
 *
 * The code always defaults to version A if the experiment is not running
 * (or ended) and we still have both versions in the code.
 *
 * Note: The optimize script needs to be uncommented from index.html before
 * starting experiments.
 */

export enum ExperimentID {
  HAMBURGER_MENU_DESKTOP = 'ValZVSToRlOxvqM1QYtjIA',
}

export type ExperimentProps = Omit<OptimizeExperimentProps, 'id'> & {
  id: ExperimentID;
};

const Experiment: React.FC<ExperimentProps> = props => {
  const { id, ...otherProps } = props;
  return <OptimizeExperiment id={id} {...otherProps} />;
};

export default Experiment;
