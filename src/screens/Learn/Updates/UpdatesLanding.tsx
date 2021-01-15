import React from 'react';
import { formatMetatagDate } from 'common/utils';
import ArticlesLanding from '../Articles/ArticlesLanding';
import articles from 'cms-content/updates';

// TODO: Update the page description
const ExplainedLanding: React.FC = () => {
  const date = formatMetatagDate();
  return (
    <ArticlesLanding
      title="Covid Act Now Updates"
      canonicalUrl={'/covid-act-now-updates'}
      pageTitle="Covid Act Now Updates"
      pageDescription={`${date} stand-in-description`}
      articles={articles}
    />
  );
};

export default ExplainedLanding;
