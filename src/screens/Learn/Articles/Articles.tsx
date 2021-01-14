import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
// import ArticlesLanding from './ArticlesLanding';
// import Article from './Article';

const Articles: React.FC = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        {/* <ArticlesLanding /> */}
      </Route>
      <Route path={`${path}/:articleId`}>{/* <Article /> */}</Route>
    </Switch>
  );
};

export default Articles;
