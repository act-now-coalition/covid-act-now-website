import React, { useState } from 'react';
import TabsPanel from './TabsPanel';

export default {
  title: 'Shared Components/TabsPanel',
  component: TabsPanel,
};

const tabList = [
  {
    title: 'Eligible now',
    renderPanel: () => <div>Panel 1</div>,
    className: 'Eligible-now',
  },
  {
    title: 'Eligible later',
    renderPanel: () => <div>Panel 2</div>,
    className: 'Eligible-later',
  },
];

export const Example = () => <TabsPanel tabList={tabList} />;

export const UpdatingOutside = () => {
  const [label, setLabel] = useState('Label A');

  const onSelectTab = (newTabIndex: number) => {
    setLabel(newTabIndex === 0 ? 'Label A' : 'Label B');
  };

  return (
    <div>
      <h3>{label}</h3>
      <TabsPanel tabList={tabList} onSelectTab={onSelectTab} />
    </div>
  );
};
