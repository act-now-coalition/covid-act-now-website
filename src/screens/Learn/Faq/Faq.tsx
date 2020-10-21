import React from 'react';
import { Wrapper, PageHeader } from './Faq.style';
import FaqSection from './FaqSection';
import { faqContent } from 'cms-content/learn';

const faqHeader = faqContent.header;
const faqSections = faqContent.sections;

const Faq = () => {
  return (
    <Wrapper>
      <PageHeader>{faqHeader}</PageHeader>
      <p>*** insert table of contents ***</p>
      {faqSections.map((section: any, i: number) => (
        <FaqSection content={section} />
      ))}
    </Wrapper>
  );
};

export default Faq;
