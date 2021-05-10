import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  ExpandButton,
  InnerContent,
} from './ExpandableContainer.style';
import {
  ExpandableSection,
  sectionDetails,
} from 'components/ExpandableContainer';
import { EventCategory } from 'components/Analytics';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const ExpandableContainer: React.FC<{ section: ExpandableSection }> = ({
  section,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    collapsedHeight,
    tabTextCollapsed,
    tabTextExpanded,
    trackingLabel,
  } = sectionDetails[section];

  const { pathname } = useLocation();

  useEffect(() => {
    setCollapsed(true);
  }, [pathname]);

  return (
    <Container>
      <InnerContent collapsedHeight={collapsedHeight} collapsed={collapsed}>
        {children}
      </InnerContent>
      <ExpandButton
        onClick={() => setCollapsed(!collapsed)}
        trackingCategory={EventCategory.NONE} // Change when implementing beyond storybook
        trackingLabel={`Expand location page module: ${trackingLabel}`}
        endIcon={collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      >
        {collapsed ? tabTextCollapsed : tabTextExpanded}
      </ExpandButton>
    </Container>
  );
};

export default ExpandableContainer;
