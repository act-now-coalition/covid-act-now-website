import React from 'react';
import { formatMetatagDate } from 'common/utils';
import ArticlesLanding from '../Articles/ArticlesLanding';
import articles from 'cms-content/explained';

const metaDescription = `Get the facts about how COVID is spread, how to prevent transmission, and the latest on treatments and vaccines. Backed by medical experts.`;
const sectionIntro =
  'COVID is confusing. How does it spread? How is it treated? Who does it affect most? To help you make good decisions, here is a series of informative articles written by health advisors for Covid Act Now, guest writers and COVID Explained’s team of researchers and  science students at Brown University, Harvard Medical School, Massachusetts General Hospital and the Massachusetts Institute of Technology (MIT).';

const ExplainedLanding: React.FC = () => {
  const date = formatMetatagDate();
  return (
    <ArticlesLanding
      title="COVID explained"
      sectionIntro={sectionIntro}
      canonicalUrl={'/covid-explained'}
      pageTitle="COVID-19 Explained"
      pageDescription={`${date} ${metaDescription}`}
      articles={articles}
    />
  );
};

export default ExplainedLanding;
