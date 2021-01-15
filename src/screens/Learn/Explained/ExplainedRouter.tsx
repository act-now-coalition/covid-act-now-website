import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import urlJoin from 'url-join';
import ExplainedLanding from './ExplainedLanding';
import Article from '../Articles/Article';
import articles from 'cms-content/explained';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';

// TODO: Create a new category
const trackShareFacebook = () =>
  trackEvent(EventCategory.ARTICLES, EventAction.SHARE, 'facebook');

const trackShareTwitter = () =>
  trackEvent(EventCategory.ARTICLES, EventAction.SHARE, 'twitter');

const trackCopyLink = () => {
  trackEvent(EventCategory.ARTICLES, EventAction.COPY_LINK, 'COVID explained');
};

const ExplainedRouter: React.FC = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} key="explained">
        <ExplainedLanding />
      </Route>
      {articles.map(article => {
        const relativeUrl = urlJoin(path, article.articleID);
        const shareQuote = `See '${article.header}', part of @CovidActNow's educational series for the everyday person, written by our health advisors, guest writers, and the COVID Explained team.`;
        return (
          <Route path={relativeUrl} key={relativeUrl}>
            <Article
              article={article}
              onShareOnFacebook={trackShareFacebook}
              onShareOnTwitter={trackShareTwitter}
              onCopyLink={trackCopyLink}
              shareQuote={shareQuote}
              canonicalUrl={urlJoin('https://covidactnow.org/', relativeUrl)}
              parentItem={{ to: '/covid-explained', label: 'COVID explained' }}
            />
          </Route>
        );
      })}
      {/* Redirect bad URLs to the explained landing page */}
      <Route path="/*" key="bad-url">
        <Redirect to="/covid-explained" />
      </Route>
    </Switch>
  );
};

export default ExplainedRouter;
