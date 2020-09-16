import React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import ShareCardImage from './ShareCardImage';
import ChartShareImage from './ChartShareImage';
import ChartExportImage from './ChartExportImage';
import ExploreChartImage from './ExploreChartImage';
import ExploreChartExportImage from './ExploreChartExportImage';
import CompareTableImage from './CompareTableImage';
import { useSharedComponentParams } from 'common/sharing';

function SharedComponentImage() {
  const componentParams = useSharedComponentParams(undefined);
  if (componentParams) {
    switch (componentParams['componentName']) {
      case 'compare':
        return <CompareTableImage />;
    }
  }

  return <>Could not find / read component sharing params</>;
}

export default function ShareImage({ match }: RouteComponentProps<{}>) {
  return (
    <Switch>
      {/* HOME PAGE SHARE CARD */}
      <Route exact path={`${match.path}`} component={ShareCardImage} />

      {/* LOCATION PAGES SHARE CARD */}
      <Route
        exact
        path={`${match.path}states/:stateId`}
        component={ShareCardImage}
      />
      <Route
        exact
        path={`${match.path}counties/:countyFipsId`}
        component={ShareCardImage}
      />

      {/* METRIC CHARTS */}
      <Route
        exact
        path={`${match.path}states/:stateId/chart/:metric`}
        component={ChartShareImage}
      />
      <Route
        exact
        path={`${match.path}states/:stateId/chart/:metric/export`}
        component={ChartExportImage}
      />
      <Route
        exact
        path={`${match.path}counties/:countyFipsId/chart/:metric`}
        component={ChartShareImage}
      />
      <Route
        exact
        path={`${match.path}counties/:countyFipsId/chart/:metric/export`}
        component={ChartExportImage}
      />

      {/* EXPLORE CHARTS */}
      <Route
        exact
        path={`${match.path}states/:stateId/explore/:chartId`}
        component={ExploreChartImage}
      />
      <Route
        exact
        path={`${match.path}counties/:countyFipsId/explore/:chartId`}
        component={ExploreChartImage}
      />
      <Route
        exact
        path={`${match.path}counties/:countyFipsId/explore/:chartId/export`}
        component={ExploreChartExportImage}
      />
      <Route
        exact
        path={`${match.path}states/:stateId/explore/:chartId/export`}
        component={ExploreChartExportImage}
      />

      {/* SHARED COMPONENTS (Compare, Explore, etc.) */}
      <Route
        exact
        path={`${match.path}share/:sharedComponentId`}
        component={SharedComponentImage}
      />

      {/* DEFAULT */}
      <Route path="/*">Bad Share Image URL.</Route>
    </Switch>
  );
}
