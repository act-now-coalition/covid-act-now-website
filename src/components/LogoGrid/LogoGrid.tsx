import React from 'react';

import {
  StyledPartnerLogoGrid,
  StyledPressLogoGrid,
  Logo,
  LogoWrapper,
} from './LogoGrid.style';

export const PartnerLogoGrid = () => {
  return (
    <StyledPartnerLogoGrid>
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
        <Logo src="/images/cerc.jpg" style={{ transform: 'scale(1.1)' }} />
      </a>
      <a
        href="https://grandrounds.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Logo src="/images/grand-rounds.png" />
      </a>
    </StyledPartnerLogoGrid>
  );
};

export const PressLogoGrid = () => {
  return (
    <StyledPressLogoGrid>
      <LogoWrapper>
        <Logo src="/images/press/nyt.png" />
      </LogoWrapper>
      <LogoWrapper>
        <Logo src="/images/press/wsj.png" />
      </LogoWrapper>
      <LogoWrapper>
        <Logo src="/images/press/vox.png" />
      </LogoWrapper>
    </StyledPressLogoGrid>
  );
};
