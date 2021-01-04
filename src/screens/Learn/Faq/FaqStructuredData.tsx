import React from 'react';
import {
  JSONLD,
  Question,
  Answer,
  GenericCollection,
  // @ts-ignore: getting error for this import :(
} from 'react-structured-data';
import { faqQuestionItems } from 'cms-content/learn';

const FaqStructuredData: React.FC = () => {
  return (
    <JSONLD>
      <GenericCollection type="FAQPage" jsonldtype="FAQPage">
        {/* fix the any? */}
        {faqQuestionItems.map((item: any) => {
          return (
            <Question name={item.question}>
              <Answer text={item.answer} />
            </Question>
          );
        })}
      </GenericCollection>
    </JSONLD>
  );
};

export default FaqStructuredData;
