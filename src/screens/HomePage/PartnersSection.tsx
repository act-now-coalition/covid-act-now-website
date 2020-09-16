import React from 'react';
import { PartnerLogoGrid, PressLogoGrid } from 'components/LogoGrid/LogoGrid';
import {
  Content,
  FeaturedHeader,
  PartnerSection,
  PartnerHeader,
} from './HomePage.style';

function PartnersSection() {
  return (
    <PartnerSection>
      <Content>
        <PartnerHeader>Our Partners</PartnerHeader>
        <PartnerLogoGrid />
        <FeaturedHeader>Featured In</FeaturedHeader>
        <PressLogoGrid />
      </Content>
    </PartnerSection>
  );
}

export default PartnersSection;
