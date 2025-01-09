import React, { ComponentType } from 'react';
import { menuContent } from 'cms-content/footer';
import AboutUsSection from './AboutUsSection';
import { ContentWrapper } from './Menu.style';
import { useBreakpoint } from 'common/hooks';

const MenuContent: React.FC<{
  onClick: (label: string) => void;
  Logo?: ComponentType;
}> = ({ onClick, Logo }) => {
  const { aboutUs } = menuContent;

  const isMobile = useBreakpoint(800);

  return (
    <ContentWrapper>
      {isMobile ? (
        <>
          <AboutUsSection aboutUsCopy={aboutUs} onClick={onClick} Logo={Logo} />
        </>
      ) : (
        <>
          <AboutUsSection aboutUsCopy={aboutUs} onClick={onClick} Logo={Logo} />
        </>
      )}
    </ContentWrapper>
  );
};

export default MenuContent;
