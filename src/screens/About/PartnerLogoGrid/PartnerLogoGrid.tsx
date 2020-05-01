import React from 'react';

import { LogoGrid, Logo } from './PartnerLogoGrid.style';

const PartnerLogoGrid = () => {
  return (
    <LogoGrid>
      <a
        href="https://ghss.georgetown.edu/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Logo src="/images/ghss.png" />
      </a>
      <a
        href="http://med.stanford.edu/cerc.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Logo src="/images/cerc.jpg" />
      </a>
      <a
        href="https://grandrounds.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Logo src="/images/grand-rounds.png" />
      </a>
    </LogoGrid>
  );
};

export default PartnerLogoGrid;
