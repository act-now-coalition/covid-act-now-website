import React from 'react';
import FaqSection from './FaqSection';
import { faqContent, Section } from 'cms-content/learn';
import TableOfContents, {
  Item,
  SideTableOfContents,
} from 'components/TableOfContents';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import * as Style from './Faq.style';

const faqHeader = faqContent.header;
const faqSections = faqContent.sections;

function getSectionItems(sections: Section[]): Item[] {
  return sections.map(section => ({
    id: section.sectionId,
    title: section.sectionTitle,
  }));
}

const Faq = () => {
  return (
    <Style.PageContainer>
      {/* TODO: Review the page metatags with the team */}
      <AppMetaTags
        canonicalUrl="/learn"
        pageTitle="Frequently Asked Questions"
        pageDescription="Frequently Asked Questions"
      />
      <Style.PageContent>
        <Style.PageHeader>{faqHeader}</Style.PageHeader>
        <Style.MobileOnly>
          <TableOfContents items={getSectionItems(faqSections)} />
        </Style.MobileOnly>
        {faqSections.map((section: Section, i: number) => (
          <FaqSection key={section.sectionId} content={section} />
        ))}
      </Style.PageContent>
      <Style.DesktopOnly>
        <Style.Sidebar>
          <SideTableOfContents items={getSectionItems(faqSections)} />
        </Style.Sidebar>
      </Style.DesktopOnly>
    </Style.PageContainer>
  );
};

export default Faq;
