import React from 'react';
import { Wrapper, PageHeader } from '../Learn.style';
import Section from './Section';
import { faqContent, FaqSection } from 'cms-content/learn';
import TableOfContents, { Item } from 'components/TableOfContents';
import Breadcrumbs, { BreadcrumbItem } from 'components/Breadcrumbs';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import * as Style from './Faq.style';

const faqHeader = faqContent.header;
const faqSections = faqContent.sections;

function getSectionItems(sections: FaqSection[]): Item[] {
  return sections.map(section => ({
    id: section.sectionId,
    title: section.sectionTitle,
  }));
}

const breadcrumbItems: BreadcrumbItem[] = [
  { to: '/', label: 'Home' },
  { to: '/learn', label: 'Learn' },
  { to: '/faq', label: 'FAQ' },
];

const Faq = () => {
  return (
    <Wrapper>
      <AppMetaTags
        canonicalUrl="/faq"
        pageTitle="COVID-19 FAQ - America's COVID warning system - Covid Act Now"
        pageDescription="Find trusted answers to some of the most Frequently Asked Questions about Coronavirus (2019-nCoV). Make informed decisions to stop the disease for you and your community."
      />
      <Style.PageContent>
        <Style.BreadcrumbsContainer>
          <Breadcrumbs pathItems={breadcrumbItems} />
        </Style.BreadcrumbsContainer>
        <PageHeader>{faqHeader}</PageHeader>
        <Style.MobileOnly>
          <TableOfContents items={getSectionItems(faqSections)} />
        </Style.MobileOnly>
        {faqSections.map((section: FaqSection) => (
          <Section key={section.sectionId} content={section} />
        ))}
      </Style.PageContent>
    </Wrapper>
  );
};

export default Faq;
