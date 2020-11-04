import React from 'react';
import { BreadcrumbsContainer } from '../Learn.style';
import Section from './Section';
import { faqContent, FaqSection } from 'cms-content/learn';
import TableOfContents, { Item } from 'components/TableOfContents';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import * as Style from './Faq.style';
import Breadcrumbs from 'components/Breadcrumbs';
import { formatMetatagDate } from 'common/utils';
import { MarkdownContent, Heading1 } from 'components/Markdown';
import LearnPageContainer from '../LearnPageContainer';

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
    <LearnPageContainer>
      <AppMetaTags
        canonicalUrl="/faq"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
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
    </LearnPageContainer>
  );
};

export default Faq;
