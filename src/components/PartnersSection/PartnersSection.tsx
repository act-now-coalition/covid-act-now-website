import React from 'react';
import { PartnerLogoGrid } from 'components/LogoGrid/LogoGrid';
import {
  Content,
  PartnerSection,
  PartnerHeader,
} from 'screens/HomePage/HomePage.style';

function PartnersSection() {
  return (
    <PartnerSection>
      <Content>
        <PartnerHeader>Our Partners</PartnerHeader>
        <PartnerLogoGrid />
      </Content>
    </PartnerSection>
  );
}

export default PartnersSection;
