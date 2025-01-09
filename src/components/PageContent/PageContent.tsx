import React, { Fragment, useState } from 'react';
import { NavBarSearch } from 'components/NavBar';
import { NavAllOtherPages } from 'components/NavBar';
import SidebarContents from 'components/SidebarContents';
import { TocItem } from 'cms-content/utils';
import {
  PageContainer,
  MainContent,
  Sidebar,
  Sticky,
  DesktopOnly,
} from './PageContent.style';
import { useScrollToElement } from 'common/hooks';

const PageContent: React.FC<{ sidebarItems: TocItem[] }> = ({
  children,
  sidebarItems,
}) => {
  useScrollToElement();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Fragment>
      <NavAllOtherPages
        renderSearch={() => (
          <NavBarSearch menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        )}
        renderSecondaryElement={() => <></>}
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
    </Fragment>
  );
};

export default PageContent;
