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
  collapsedHeightDesktop: string;
  collapsedHeightMobile: string;
  tabTextCollapsed: React.ReactNode;
  tabTextExpanded: React.ReactNode;
  trackingLabel: string;
  trackingCategory: EventCategory;
  disableArrowChange?: boolean;
  secondaryOnClick?: () => void;
  renderContent?: (collapsed: boolean) => React.ReactNode;
}

const ExpandableContainer: React.FC<ExpandableContainerProps> = ({
  collapsedHeightDesktop,
  collapsedHeightMobile,
  tabTextCollapsed,
  tabTextExpanded,
  trackingLabel,
  trackingCategory,
  disableArrowChange,
  secondaryOnClick,
  renderContent,
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
        $collapsedHeight={
          isMobile ? collapsedHeightMobile : collapsedHeightDesktop
        }
        $collapsed={collapsed}
      >
        {renderContent ? renderContent(collapsed) : children}
      </InnerContent>
      <ExpandButton
        onClick={() => {
          setCollapsed(!collapsed);
          if (secondaryOnClick) {
            secondaryOnClick();
          }
        }}
        trackingCategory={trackingCategory}
        trackingLabel={`${collapsed ? 'Expand' : 'Collapse'}: ${trackingLabel}`}
        endIcon={
          disableArrowChange ? (
            <ExpandMoreIcon />
          ) : collapsed ? (
            <ExpandMoreIcon />
          ) : (
            <ExpandLessIcon />
          )
        }
        $collapsed={collapsed}
      >
        {collapsed ? tabTextCollapsed : tabTextExpanded}
      </ExpandButton>
    </Container>
  );
};

export default ExpandableContainer;
