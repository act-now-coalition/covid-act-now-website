import React from 'react';
import {
  PageContainer,
  PageHeader,
  PageContent,
  BreadcrumbsContainer,
  PageIntro,
} from '../Learn.style';
import Section from './Section';
import { faqContent, FaqSection } from 'cms-content/learn';
import TableOfContents, { Item } from 'components/TableOfContents';
import Breadcrumbs from 'components/Breadcrumbs';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import * as Style from './Faq.style';
import { BreadcrumbItem } from 'components/Breadcrumbs';
import { formatNumericalDate } from 'common/utils';

const Faq = () => {
  const {
    header,
    intro,
    sections,
    metadataTitle,
    metadataDescription,
  } = faqContent;
  const date = formatNumericalDate(new Date());

  function getSectionItems(sections: FaqSection[]): Item[] {
    return sections.map(section => ({
      id: section.sectionId,
      title: section.sectionTitle,
    }));
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { to: '/learn', label: 'Learn' },
    { to: '/faq', label: 'FAQ' },
  ];

  return (
    <PageContainer>
      <AppMetaTags
        canonicalUrl="/faq"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent>
        <BreadcrumbsContainer>
          <Breadcrumbs pathItems={breadcrumbItems} />
        </BreadcrumbsContainer>
        <PageHeader>{header}</PageHeader>
        <PageIntro source={intro} />
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
