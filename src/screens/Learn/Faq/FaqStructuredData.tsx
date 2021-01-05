import React from 'react';
// @ts-ignore: getting error for this import :(
import { FAQPage } from '@24hr/react-structured-data';
import { faqQuestionItems } from 'cms-content/learn';

const FaqStructuredData: React.FC = () => {
  return <FAQPage questions={faqQuestionItems} />;
};

export default FaqStructuredData;
