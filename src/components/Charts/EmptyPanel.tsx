/** Renders in place of a chart when there is no data */

import React from 'react';
import { EmptyPanelContainer } from 'components/Charts/Charts.style';

const EmptyPanel: React.FC = ({ children }) => {
  return <EmptyPanelContainer>{children}</EmptyPanelContainer>;
};

export default EmptyPanel;
