import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import urlJoin from 'url-join';
import UpdatesLanding from './UpdatesLanding';
import Article from '../Articles/Article';
import articles from 'cms-content/updates';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';

// TODO: Create a new category
const trackShareFacebook = () =>
  trackEvent(EventCategory.ARTICLES, EventAction.SHARE, 'facebook');

const trackShareTwitter = () =>
  trackEvent(EventCategory.ARTICLES, EventAction.SHARE, 'twitter');

const trackCopyLink = () => {
  trackEvent(EventCategory.ARTICLES, EventAction.COPY_LINK, 'CAN Updates');
};

// TODO: get the final share quote
const shareQuote = 'stand-in-copy';

const UpdatesRouter: React.FC = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <UpdatesLanding />
      </Route>
      {articles.map(article => {
        const relativeUrl = urlJoin(path, article.articleID);
        return (
          <Route path={relativeUrl}>
            <Article
              article={article}
              onShareOnFacebook={trackShareFacebook}
              onShareOnTwitter={trackShareTwitter}
              onCopyLink={trackCopyLink}
              shareQuote={shareQuote}
              canonicalUrl={urlJoin('https://covidactnow.org/', relativeUrl)}
              parentItem={{
                to: '/covid-act-now-updates',
                label: 'Covid Act Now updates',
              }}
            />
          </Route>
        );
      })}
      {/* Redirect bad URLs to the updates landing page */}
      <Route path="/*">
        <Redirect to="/covid-act-now-updates" />
      </Route>
    </Switch>
  );
};

export default UpdatesRouter;
