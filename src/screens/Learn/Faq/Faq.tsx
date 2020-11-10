import React, { Fragment } from 'react';
import { formatMetatagDate } from 'common/utils';
import TableOfContents, { Item } from 'components/TableOfContents';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import { MarkdownContent, Heading1 } from 'components/Markdown';
import PageContent, { MobileOnly } from 'components/PageContent';
import { faqContent, FaqSection, sidebarItemsLearn } from 'cms-content/learn';
import { BreadcrumbsContainer } from '../Learn.style';
import Section from './Section';

const Faq: React.FC = () => {
  const {
    header,
    intro,
    sections,
    metadataTitle,
    metadataDescription,
  } = faqContent;
  const date = formatMetatagDate();

  function getSectionItems(sections: FaqSection[]): Item[] {
    return sections.map(section => ({
      id: section.sectionId,
      title: section.sectionTitle,
    }));
  }

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/faq"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent sidebarItems={sidebarItemsLearn}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <Heading1>{header}</Heading1>
        <MarkdownContent source={intro} />
        <MobileOnly>
          <TableOfContents items={getSectionItems(sections)} />
        </MobileOnly>
        {sections.map((section: FaqSection) => (
          <Section key={section.sectionId} content={section} />
        ))}
      </PageContent>
    </Fragment>
  );
};

export default Faq;
