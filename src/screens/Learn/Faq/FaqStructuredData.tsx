import React from 'react';
import {
  JSONLD,
  Question,
  Answer,
  GenericCollection,
  Generic,
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
            <Generic>
              <Question name={item.question}>
                <Answer text={item.answer} />
              </Question>
            </Generic>
          );
        })}
      </GenericCollection>
    </JSONLD>
  );
};

export default FaqStructuredData;
