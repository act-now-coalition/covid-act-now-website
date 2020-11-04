import React from 'react';
import SidebarContents from 'components/SidebarContents';
import { learnPages } from 'cms-content/learn';
import {
  PageContainer,
  PageContent,
  PageSidebar,
  Sticky,
  DesktopOnly,
} from './Learn.style';

const LearnPageContainer: React.FC = ({ children }) => {
  return (
    <PageContainer>
      <PageContent>{children}</PageContent>
      <DesktopOnly>
        <PageSidebar>
          <Sticky>
            <SidebarContents items={learnPages} />
          </Sticky>
        </PageSidebar>
      </DesktopOnly>
    </PageContainer>
  );
};
export default LearnPageContainer;
