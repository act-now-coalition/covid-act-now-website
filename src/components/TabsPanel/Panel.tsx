import React from 'react';
import { PanelContent } from './TabsPanel.style';

type PanelContentProps = React.ComponentProps<typeof PanelContent>;

const Panel: React.FC<
  PanelContentProps & {
    selectedTabIndex: number;
    tabIndex: number;
  }
> = ({ selectedTabIndex, tabIndex, children, ...otherProps }) => (
  <PanelContent
    role="tabpanel"
    hidden={tabIndex !== selectedTabIndex}
    {...otherProps}
  >
    {selectedTabIndex === tabIndex && children}
  </PanelContent>
);

export default Panel;
