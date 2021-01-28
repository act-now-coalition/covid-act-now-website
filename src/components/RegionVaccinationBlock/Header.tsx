import React, { Fragment } from 'react';
import { Heading2, Paragraph } from './RegionVaccinationBlock.style';

const Header: React.FC = () => (
  <Fragment>
    <Heading2>Getting vaccinated</Heading2>
    <Paragraph>
      Vaccination procedures vary by location. Below are official resources on
      when and how you can get vaccinated.
    </Paragraph>
  </Fragment>
);

export default Header;
