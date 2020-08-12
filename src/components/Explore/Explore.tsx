import React, { useState, FunctionComponent } from 'react';
import ExploreTabs from './ExploreTabs';
import * as Styles from './Explore.style';

// TODO(pablo): Create enums and unify with metrics
const tabLabels = [
  'Cases',
  'Deaths',
  'Hospitalizations',
  'ICU Hospitalizations',
];

const Explore: React.FunctionComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const onChangeTab = (event: React.ChangeEvent<{}>, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Styles.Container>
      <Styles.Placeholder>header</Styles.Placeholder>
      <ExploreTabs
        activeTabIndex={tabIndex}
        labels={tabLabels}
        onChangeTab={onChangeTab}
      />
      <Styles.Placeholder>{`chart ${tabLabels[tabIndex]}`}</Styles.Placeholder>
    </Styles.Container>
  );
};

export default Explore;
