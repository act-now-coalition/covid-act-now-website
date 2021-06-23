import React from 'react';
import { PartnerLogoGrid } from 'components/LogoGrid/LogoGrid';
import {
  SmallSectionHeader,
  SectionWrapper,
} from 'screens/HomePage/HomePage.style';

function PartnersSection() {
  return (
    <SectionWrapper>
      <SmallSectionHeader>Our Partners</SmallSectionHeader>
      <PartnerLogoGrid />
    </SectionWrapper>
  );
}

export default PartnersSection;
