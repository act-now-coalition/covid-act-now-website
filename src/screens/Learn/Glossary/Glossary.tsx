import React, { Fragment } from 'react';
import { BreadcrumbsContainer } from '../Learn.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { MarkdownContent, Heading1 } from 'components/Markdown';
import PageContent, { MobileOnly } from 'components/PageContent';
import {
  glossaryContent,
  learnPages,
  TermsByCategory,
  glossaryContentByCategory,
} from 'cms-content/learn';
import Breadcrumbs from 'components/Breadcrumbs';
import TableOfContents, { Anchor } from 'components/TableOfContents';
import { formatMetatagDate } from 'common/utils';
import MappedSection from '../Shared/MappedSection';

const Glossary: React.FC = () => {
  const { header, intro, metadataTitle, metadataDescription } = glossaryContent;

  const date = formatMetatagDate();

  function getTocItems(categories: TermsByCategory[]) {
    return categories.map((category: TermsByCategory) => ({
      id: category.categoryId,
      title: category.categoryName,
    }));
  }

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
        <MobileOnly>
          <TableOfContents items={getTocItems(glossaryContentByCategory)} />
        </MobileOnly>
        {glossaryContentByCategory.map((category: TermsByCategory) => (
          <Fragment key={category.categoryId}>
            <Anchor id={category.categoryId} />
            <MappedSection category={category} />
          </Fragment>
        ))}
      </PageContent>
    </Fragment>
  );
};

export default Glossary;
