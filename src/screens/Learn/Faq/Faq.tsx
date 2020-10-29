import React from 'react';
import {
  PageContainer,
  PageHeader,
  PageContent,
  BreadcrumbsContainer,
  PageIntroMarkdown,
} from '../Learn.style';
import Section from './Section';
import { faqContent, FaqSection } from 'cms-content/learn';
import TableOfContents, { Item } from 'components/TableOfContents';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import * as Style from './Faq.style';
import Breadcrumbs from 'components/Breadcrumbs';
import { formatMetatagDate } from 'common/utils';

const Faq = () => {
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
    <PageContainer>
      <AppMetaTags
        canonicalUrl="/faq"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <PageHeader>{header}</PageHeader>
        <PageIntroMarkdown source={intro} />
        <Style.MobileOnly>
          <TableOfContents items={getSectionItems(sections)} />
        </Style.MobileOnly>
        {sections.map((section: FaqSection) => (
          <Section key={section.sectionId} content={section} />
        ))}
      </PageContent>
    </PageContainer>
  );
};

export default Faq;
