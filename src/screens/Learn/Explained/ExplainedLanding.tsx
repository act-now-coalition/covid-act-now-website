import React from 'react';
import { formatMetatagDate } from 'common/utils';
import ArticlesLanding from '../Articles/ArticlesLanding';
import articles from 'cms-content/explained';

const metaDescription = `Get the facts about how COVID is spread, how to prevent transmission, and the latest on treatments and vaccines. Backed by medical experts.`;

const ExplainedLanding: React.FC = () => {
  const date = formatMetatagDate();
  return (
    <ArticlesLanding
      title="COVID explained"
      canonicalUrl={'/covid-explained'}
      pageTitle="COVID-19 Explained"
      pageDescription={`${date} ${metaDescription}`}
      articles={articles}
    />
  );
};

export default ExplainedLanding;
