import React, { Fragment } from 'react';
import { Heading2, Paragraph } from './RegionVaccinationBlock.style';

const Header: React.FC = () => (
  <Fragment>
    <Heading2>Vaccines</Heading2>
    <Paragraph>
      Below are government resources to help you get vaccinated. If something is
      missing or incorrect, please let us know.
    </Paragraph>
  </Fragment>
);

export default Header;
