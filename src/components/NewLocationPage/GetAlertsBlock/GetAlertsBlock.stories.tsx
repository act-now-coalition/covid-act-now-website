import React from 'react';
import GetAlertsBlock from './GetAlertsBlock';
import regions from 'common/regions';

export default {
  title: 'Location Page/Get alerts block',
  component: GetAlertsBlock,
};

export const Example = () => {
  const state = regions.findByFipsCodeStrict('22');
  return <GetAlertsBlock region={state} onClickGetAlerts={() => {}} />;
};
