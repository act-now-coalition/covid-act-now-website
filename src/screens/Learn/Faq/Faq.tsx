import React, { Fragment } from 'react';
import { Wrapper, PageHeader } from '../Learn.style';
import Section from './Section';
import { faqContent, FaqSection } from 'cms-content/learn';
import TableOfContents, { Item } from 'components/TableOfContents';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';

const faqHeader = faqContent.header;
const faqSections = faqContent.sections;

function getSectionItems(sections: FaqSection[]): Item[] {
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
        canonicalUrl="/faq"
        pageTitle="COVID-19 FAQ - America's COVID warning system - Covid Act Now"
        pageDescription="Find trusted answers to some of the most Frequently Asked Questions about Coronavirus (2019-nCoV). Make informed decisions to stop the disease for you and your community."
      />
      <Wrapper>
        <PageHeader>{faqHeader}</PageHeader>
        <TableOfContents items={getSectionItems(faqSections)} />
        {faqSections.map((section: FaqSection) => (
          <Section key={section.sectionId} content={section} />
        ))}
      </Wrapper>
    </Fragment>
  );
};

export default Faq;
