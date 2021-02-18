import React from 'react';
import { PanelContent } from './TabsPanel.style';

const Panel: React.FC<{
  selectedTabIndex: number;
  tabIndex: number;
  ariaLabelledBy: string;
}> = ({ selectedTabIndex, tabIndex, ariaLabelledBy, children }) => (
  <PanelContent
    role="tabpanel"
    hidden={tabIndex !== selectedTabIndex}
    aria-labelledby={ariaLabelledBy}
  >
    {selectedTabIndex === tabIndex && children}
  </PanelContent>
);

export default Panel;
