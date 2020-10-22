import React, { Fragment } from 'react';
import { Wrapper, PageHeader } from './Faq.style';
import FaqSection from './FaqSection';
import { faqContent, Section } from 'cms-content/learn';
import TableOfContents, {
  Item,
  SideTableOfContents,
} from 'components/TableOfContents';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';

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
    <Fragment>
      {/* TODO: Review the page metatags with the team */}
      <AppMetaTags
        canonicalUrl="/learn"
        pageTitle="Frequently Asked Questions"
        pageDescription="Frequently Asked Questions"
      />
      <Wrapper>
        <PageHeader>{faqHeader}</PageHeader>
        <SideTableOfContents items={getSectionItems(faqSections)} />
        <TableOfContents items={getSectionItems(faqSections)} />
        {faqSections.map((section: Section, i: number) => (
          <FaqSection key={section.sectionId} content={section} />
        ))}
      </Wrapper>
    </Fragment>
  );
};

export default Faq;
