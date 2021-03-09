import React from 'react';
import {
  Experiment,
  Variant,
  ExperimentID,
  VariantID,
} from 'components/Experiment';
import NavBar from './NavBar';

const ExperimentNavBar: React.FC = () => (
  <Experiment id={ExperimentID.TOPNAV_HAMBURGER}>
    <Variant id={VariantID.A}>
      <NavBar />
    </Variant>
    <Variant id={VariantID.B}>
      <NavBar mobileBreakpoint={1035} />
    </Variant>
  </Experiment>
);

export default ExperimentNavBar;
