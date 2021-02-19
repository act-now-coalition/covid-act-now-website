import React, { useState } from 'react';
import TabsPanel from './TabsPanel';
import { ButtonBlock } from 'components/VaccinationEligibilityBlock';

export default {
  title: 'Shared Components/TabsPanel',
  component: TabsPanel,
};

const tabList = [
  {
    title: 'Eligible now',
    renderPanel: () => <div>Panel 1</div>,
  },
  {
    title: 'Eligible later',
    renderPanel: () => <div>Panel 2</div>,
  },
];

export const Example = () => <TabsPanel tabList={tabList} />;

export const UpdatingOutside = () => {
  const [label, setLabel] = useState('Label A');

  const onSelectTab = (newTabIndex: number) => {
    setLabel(newTabIndex === 0 ? 'Label A' : 'Label B');
  };

  const exampleSignupLink =
    'https://mn.gov/covid19/vaccine/find-vaccine/index.jsp';

  return (
    <div>
      <h3>{label}</h3>
      <TabsPanel tabList={tabList} onSelectTab={onSelectTab} />
      <ButtonBlock signupLink={exampleSignupLink} />
    </div>
  );
};
