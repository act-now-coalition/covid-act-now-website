import React from 'react';
import { formatMetatagDate } from 'common/utils';
import ArticlesLanding from '../Articles/ArticlesLanding';
import articles from 'cms-content/explained';

const ExplainedLanding: React.FC = () => {
  const date = formatMetatagDate();
  return (
    <ArticlesLanding
      title="COVID explained"
      canonicalUrl={'/covid-explained'}
      pageTitle="COVID-19 Explained"
      pageDescription={`${date} Explore deeper analysis about how, why, and where COVID is spreading.`}
      articles={articles}
    />
  );
};

export default ExplainedLanding;
