import React, { Fragment } from 'react';
import SidebarContents from 'components/SidebarContents';
import ShareBlock from 'components/ShareBlock/ShareBlock';
import { TocItem } from 'cms-content/utils';
import {
  PageContainer,
  MainContent,
  Sidebar,
  Sticky,
  DesktopOnly,
} from './PageContent.style';

const PageContent: React.FC<{ sidebarItems: TocItem[] }> = ({
  children,
  sidebarItems,
}) => {
  return (
    <Fragment>
      <PageContainer>
        <MainContent>{children}</MainContent>
        {/* <DesktopOnly>
          <Sidebar>
            <Sticky>
              <SidebarContents items={sidebarItems} />
            </Sticky>
          </Sidebar>
        </DesktopOnly> */}
      </PageContainer>
      <ShareBlock />
    </Fragment>
  );
};

export default PageContent;
