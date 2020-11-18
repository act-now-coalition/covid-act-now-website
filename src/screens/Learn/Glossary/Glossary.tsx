import React, { Fragment, useState } from 'react';
import { BreadcrumbsContainer, SectionName } from '../Learn.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { MarkdownContent, Heading1 } from 'components/Markdown';
import PageContent from 'components/PageContent';
import { glossaryContent, learnPages } from 'cms-content/learn';
import Breadcrumbs from 'components/Breadcrumbs';
import { Anchor } from 'components/TableOfContents';
import { formatMetatagDate } from 'common/utils';
import ScrollToTopButton from 'components/SharedComponents/ScrollToTopButton';
import { useScrollToTopButton } from 'common/hooks';

const Glossary: React.FC = () => {
  const {
    header,
    intro,
    terms,
    metadataTitle,
    metadataDescription,
  } = glossaryContent;

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const showScrollToTopButton = useScrollToTopButton(
    showScrollToTop,
    setShowScrollToTop,
  );

  const date = formatMetatagDate();

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/glossary"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <Heading1>{header}</Heading1>
        <MarkdownContent source={intro} />
        {terms.map((term: any) => (
          <Fragment>
            <Anchor id={term.termId} />
            <SectionName>{term.term}</SectionName>
            <MarkdownContent source={term.definition} />
          </Fragment>
        ))}
        <ScrollToTopButton showButton={showScrollToTopButton} />
      </PageContent>
    </Fragment>
  );
};

export default Glossary;
