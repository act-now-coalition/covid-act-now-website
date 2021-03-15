import React from 'react';
import { StyledFooter } from './Menu.style';
import MenuContent from './MenuContent';

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <MenuContent />
    </StyledFooter>
  );
};

export default Footer;
