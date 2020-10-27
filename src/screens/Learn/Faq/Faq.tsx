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

const faqHeader = faqContent.header;
const faqSections = faqContent.sections;
const faqIntro = faqContent.intro;

function getSectionItems(sections: FaqSection[]): Item[] {
  return sections.map(section => ({
    id: section.sectionId,
    title: section.sectionTitle,
  }));
}

export const breadcrumbItems: BreadcrumbItem[] = [
  { to: '/learn', label: 'Learn' },
  { to: '/faq', label: 'FAQ' },
];

const date = formatNumericalDate(new Date());

const Faq = () => {
  return (
    <PageContainer>
      <AppMetaTags
        canonicalUrl="/faq"
        pageTitle="COVID-19 FAQ - Covid Act Now"
        pageDescription={`${date} Find trusted answers to the most Frequently Asked Questions (FAQs) about the novel Coronavirus. Make informed decisions to stop the disease for you and your community.`}
      />
      <PageContent>
        <BreadcrumbsContainer>
          <Breadcrumbs pathItems={breadcrumbItems} />
        </BreadcrumbsContainer>
        <PageHeader>{faqHeader}</PageHeader>
        <PageIntro source={faqIntro} />
        <Style.MobileOnly>
          <TableOfContents items={getSectionItems(faqSections)} />
        </Style.MobileOnly>
        {faqSections.map((section: FaqSection) => (
          <Section key={section.sectionId} content={section} />
        ))}
      </PageContent>
    </PageContainer>
  );
};

export default Faq;
