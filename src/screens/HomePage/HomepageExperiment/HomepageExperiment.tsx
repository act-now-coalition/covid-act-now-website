import React from 'react';
import HomePage from '../HomePage';
import NewHomepage from '../New/NewHomepage';
import {
  Experiment,
  ExperimentID,
  Variant,
  VariantID,
} from 'components/Experiment';

const HomepageExperiment = () => {
  return (
    <>
      <Experiment id={ExperimentID.HOMEPAGE_SEARCH_REDESIGN}>
        <Variant id={VariantID.A}>
          <NewHomepage />
        </Variant>
        <Variant id={VariantID.B}>
          <HomePage />
        </Variant>
      </Experiment>
    </>
  );
};

export default HomepageExperiment;
