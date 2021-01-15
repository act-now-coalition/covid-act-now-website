import React from 'react';
import { formatMetatagDate } from 'common/utils';
import ArticlesLanding from '../Articles/ArticlesLanding';
import articles from 'cms-content/updates';

const metaDescription = `Explore recent developments — including new tools and simple instructions on how to use them — at Covid Act Now.`;

// TODO: Update the page description
const UpdatesLanding: React.FC = () => {
  const date = formatMetatagDate();
  return (
    <ArticlesLanding
      title="Covid Act Now updates"
      canonicalUrl={'/updates'}
      pageTitle="New Tools & Updates"
      pageDescription={`${date} ${metaDescription}`}
      articles={articles}
    />
  );
};

export default UpdatesLanding;
