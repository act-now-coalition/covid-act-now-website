import React from 'react';
import {
  PageContainer,
  PageContent,
  PageSidebar,
  Sticky,
  BreadcrumbsContainer,
} from '../Learn.style';
import Section from './Section';
import { faqContent, FaqSection, learnPages } from 'cms-content/learn';
import TableOfContents, { Item } from 'components/TableOfContents';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import * as Style from './Faq.style';
import Breadcrumbs from 'components/Breadcrumbs';
import { formatMetatagDate } from 'common/utils';
import { MarkdownContent, Heading1 } from 'components/Markdown';
import SidebarContents from 'components/SidebarContents';

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
        <Heading1>{header}</Heading1>
        <MarkdownContent source={intro} />
        <Style.MobileOnly>
          <TableOfContents items={getSectionItems(sections)} />
        </Style.MobileOnly>
        {sections.map((section: FaqSection) => (
          <Section key={section.sectionId} content={section} />
        ))}
      </PageContent>
      <PageSidebar>
        <Sticky>
          <SidebarContents items={learnPages} />
        </Sticky>
      </PageSidebar>
    </PageContainer>
  );
};

export default Faq;
