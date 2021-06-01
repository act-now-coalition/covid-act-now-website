import React from 'react';
import { PartnerLogoGrid } from 'components/LogoGrid/LogoGrid';
import { SectionHeader, SectionWrapper } from 'screens/HomePage/HomePage.style';

function PartnersSection() {
  return (
    <SectionWrapper>
      <SectionHeader>Our Partners</SectionHeader>
      <PartnerLogoGrid />
    </SectionWrapper>
  );
}

export default PartnersSection;
