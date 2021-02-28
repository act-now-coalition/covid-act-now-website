import React from 'react';
import { Switch, Route, useRouteMatch } from 'common/utils/router';
import Landing from './CaseStudiesLanding';
import CaseStudyPage from './CaseStudy';

const CaseStudiesLanding: React.FC = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Landing />
      </Route>
      <Route path={`${path}/:caseStudyId`}>
        <CaseStudyPage />
      </Route>
    </Switch>
  );
};

export default CaseStudiesLanding;
