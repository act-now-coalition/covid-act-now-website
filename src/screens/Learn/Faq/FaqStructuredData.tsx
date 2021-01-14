import React from 'react';
// @ts-ignore: getting error for this import :(
import { FAQPage } from '@24hr/react-structured-data';
import { faqQuestionItems } from 'cms-content/learn';
import { Helmet } from 'react-helmet';

const FaqStructuredData: React.FC = () => {
  return (
    <Helmet>
      <FAQPage questions={faqQuestionItems} />
    </Helmet>
  );
};

export default FaqStructuredData;
