import React, { ComponentType } from 'react';
import { footerContent } from 'cms-content/footer';
import FeaturedSection from './FeaturedSection';
import LearnSection from './LearnSection';
import AboutUsSection from './AboutUsSection';
import { ContentWrapper } from './Menu.style';
import { useBreakpoint } from 'common/hooks';

const MenuContent: React.FC<{
  onClick: (label: string) => void;
  Logo?: ComponentType;
}> = ({ onClick, Logo }) => {
  const { learnLinks, aboutUs, featuredSections } = footerContent;

  const isMobile = useBreakpoint(800);

  return (
    <ContentWrapper>
      {isMobile ? (
        <>
          <FeaturedSection
            featuredSections={featuredSections}
            onClick={onClick}
          />
          <LearnSection learnLinks={learnLinks} onClick={onClick} />
          <AboutUsSection aboutUsCopy={aboutUs} onClick={onClick} Logo={Logo} />
        </>
      ) : (
        <>
          <LearnSection learnLinks={learnLinks} onClick={onClick} />
          <FeaturedSection
            featuredSections={featuredSections}
            onClick={onClick}
          />
          <AboutUsSection aboutUsCopy={aboutUs} onClick={onClick} Logo={Logo} />
        </>
      )}
    </ContentWrapper>
  );
};

export default MenuContent;
