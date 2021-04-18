import React, { Fragment, useState } from 'react';
import NavBar, { NavBarSearch } from 'components/NavBar';
import SidebarContents from 'components/SidebarContents';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import { TocItem } from 'cms-content/utils';
import {
  PageContainer,
  MainContent,
  Sidebar,
  Sticky,
  DesktopOnly,
} from './PageContent.style';
import { useScrollToElement } from 'common/hooks';
import { DesktopOnlyDonateButton } from 'components/DonateButton';

const PageContent: React.FC<{ sidebarItems: TocItem[] }> = ({
  children,
  sidebarItems,
}) => {
  useScrollToElement();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Fragment>
      <NavBar
        renderSearch={menuOpen => <NavBarSearch menuOpen={menuOpen} />}
        renderSecondaryElement={() => <DesktopOnlyDonateButton />}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <PageContainer>
        <MainContent>{children}</MainContent>
        <DesktopOnly>
          <Sidebar>
            <Sticky>
              <SidebarContents items={sidebarItems} />
            </Sticky>
          </Sidebar>
        </DesktopOnly>
      </PageContainer>
      <ShareModelBlock />
    </Fragment>
  );
};

export default PageContent;
