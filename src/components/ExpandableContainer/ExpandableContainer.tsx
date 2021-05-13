import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {
  Container,
  ExpandButton,
  InnerContent,
} from './ExpandableContainer.style';
import { EventCategory } from 'components/Analytics';
import { useBreakpoint } from 'common/hooks';

export interface ExpandableContainerProps {
  collapsedHeightDesktop: number;
  collapsedHeightMobile: number;
  tabTextCollapsed: React.ReactElement;
  tabTextExpanded: React.ReactElement;
  trackingLabel: string;
}

const ExpandableContainer: React.FC<ExpandableContainerProps> = ({
  collapsedHeightDesktop,
  collapsedHeightMobile,
  tabTextCollapsed,
  tabTextExpanded,
  trackingLabel,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  const { pathname } = useLocation();

  const isMobile = useBreakpoint(600);

  useEffect(() => {
    setCollapsed(true);
  }, [pathname]);

  return (
    <Container>
      <InnerContent
        collapsedHeight={
          isMobile ? collapsedHeightMobile : collapsedHeightDesktop
        }
        collapsed={collapsed}
      >
        {children}
      </InnerContent>
      <ExpandButton
        onClick={() => setCollapsed(!collapsed)}
        trackingCategory={EventCategory.NONE} // Change when implementing beyond storybook
        trackingLabel={`Expand location page module: ${trackingLabel}`}
        endIcon={collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        collapsed={collapsed}
      >
        {collapsed ? tabTextCollapsed : tabTextExpanded}
      </ExpandButton>
    </Container>
  );
};

export default ExpandableContainer;
