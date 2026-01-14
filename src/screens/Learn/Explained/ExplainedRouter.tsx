import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import urlJoin from 'url-join';
import ExplainedLanding from './ExplainedLanding';
import Article from '../Articles/Article';
import articles from 'cms-content/explained';

const ExplainedRouter: React.FC = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} key="explained">
        <ExplainedLanding />
      </Route>
      {articles.map(article => {
        const relativeUrl = urlJoin(path, article.articleID);
        return (
          <Route path={relativeUrl} key={relativeUrl}>
            <Article
              article={article}
              canonicalUrl={urlJoin('https://covidactnow.org/', relativeUrl)}
              parentItem={{ to: '/covid-explained', label: 'COVID explained' }}
            />
          </Route>
        );
      })}
      {/* This URL contained a typo that was corrected after launching/sharing the article a bit. Adding a redirect so the old URL doesn't break: */}
      <Redirect
        from="/covid-explained/combatting-vaccine-hesitancy"
        to="/covid-explained/combating-vaccine-hesitancy"
      />
      {/* Redirect bad URLs to the explained landing page */}
      <Route path="/*" key="bad-url">
        <Redirect to="/covid-explained" />
      </Route>
    </Switch>
  );
};

export default ExplainedRouter;
