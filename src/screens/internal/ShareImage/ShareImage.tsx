import React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import ShareCardImage from './ShareCardImage';
import ChartShareImage from './ChartShareImage';
import ChartExportImage from './ChartExportImage';

export default function ShareImage({ match }: RouteComponentProps<{}>) {
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={ShareCardImage} />
      <Route
        exact
        path={`${match.path}states/:stateId`}
        component={ShareCardImage}
      />
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
        path={`${match.path}counties/:countyFipsId`}
        component={ShareCardImage}
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
      <Route path="/*">Bad Share Image URL.</Route>
    </Switch>
  );
}
