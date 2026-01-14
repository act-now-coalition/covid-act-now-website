import React from 'react';
import { formatMetatagDate } from 'common/utils';
import ArticlesLanding from '../Articles/ArticlesLanding';
import articles from 'cms-content/explained';

const metaDescription = `Get the facts about how COVID is spread, how to prevent transmission, and the latest on treatments and vaccines. Backed by medical experts.`;
const sectionIntro =
  'Our archive of articles containing facts about how COVID is spread, how to prevent transmission, and treatments and vaccines, written by scientists, researchers and public health experts.';

const ExplainedLanding: React.FC = () => {
  const date = formatMetatagDate();
  return (
    <ArticlesLanding
      title="COVID explained"
      sectionIntro={sectionIntro}
      canonicalUrl={'/'}
      pageTitle="COVID-19 Explained"
      pageDescription={`${date} ${metaDescription}`}
      articles={articles}
    />
  );
};

export default ExplainedLanding;
