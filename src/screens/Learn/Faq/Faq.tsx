import React from 'react';
import { Wrapper, PageHeader } from './Faq.style';
import FaqSection from './FaqSection';
import { faqContent, Section } from 'cms-content/learn';
import TableOfContents, { Item } from 'components/TableOfContents';

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
    <Wrapper>
      <PageHeader>{faqHeader}</PageHeader>
      <TableOfContents items={getSectionItems(faqSections)} />
      {faqSections.map((section: Section) => (
        <FaqSection key={section.sectionId} content={section} />
      ))}
    </Wrapper>
  );
};

export default Faq;
