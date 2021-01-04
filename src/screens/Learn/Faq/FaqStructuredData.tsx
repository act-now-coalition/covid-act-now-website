import React from 'react';
import {
  JSONLD,
  Question,
  Answer,
  Generic,
  GenericCollection,
  // @ts-ignore: getting error for this import :(
} from 'react-structured-data';
import { faqQuestionItems } from 'cms-content/learn';

const FaqStructuredData: React.FC = () => {
  return (
    <JSONLD>
      <GenericCollection type="FAQPage" jsonldtype="FAQPage">
        {faqQuestionItems.map((item: any) => {
          return (
            <Generic type="FAQPage" jsonldtype="FAQPage">
              <Question name={item.question} />
              <Answer text={item.answer} />
            </Generic>
          );
        })}
      </GenericCollection>
    </JSONLD>
  );
};

export default FaqStructuredData;
