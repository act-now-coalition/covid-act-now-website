import React, { Fragment } from 'react';
import { Wrapper, PageHeader } from './Faq.style';
import FaqSection from './FaqSection';
import { faqContent } from 'cms-content/learn';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';

const faqHeader = faqContent.header;
const faqSections = faqContent.sections;

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
        <p>*** insert table of contents ***</p>
        {faqSections.map((section: any, i: number) => (
          <FaqSection content={section} />
        ))}
      </Wrapper>
    </Fragment>
  );
};

export default Faq;
