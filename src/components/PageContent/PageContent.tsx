import React, { Fragment } from 'react';
import NavBar from 'components/AppBar';
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

const PageContent: React.FC<{ sidebarItems: TocItem[] }> = ({
  children,
  sidebarItems,
}) => {
  useScrollToElement();

  return (
    <Fragment>
      <NavBar />
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
