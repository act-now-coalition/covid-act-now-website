import React, { useState } from 'react';
import TabsPanel from './TabsPanel';

export default {
  title: 'Shared Components/TabsPanel',
  component: TabsPanel,
};

const tabList = [
  {
    title: 'Blue',
    indicatorColor: '#002984',
    renderPanel: () => <div>Blue</div>,
  },
  {
    title: 'Orange',
    indicatorColor: '#f44336',
    renderPanel: () => <div>Orange</div>,
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
