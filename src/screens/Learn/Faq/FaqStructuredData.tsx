import React, { Fragment } from 'react';
import {
  JSONLD,
  Question,
  Answer,
  GenericCollection,
  // @ts-ignore: getting error for this import :(
} from 'react-structured-data';
import {
  faqContent,
  FaqSection,
  Question as QuestionItem,
} from 'cms-content/learn';

const FaqStructuredData: React.FC = () => {
  const { sections } = faqContent;
  return (
    <JSONLD>
      <GenericCollection type="FAQPage">
        {sections.map((section: FaqSection) => {
          const { questions } = section;
          questions.map((questionItem: QuestionItem, i: number) => {
            return (
              <Fragment key={`question-${i}`}>
                <Question name={questionItem.question} />
                <Answer text={questionItem.answer} />
              </Fragment>
            );
          });
        })}
      </GenericCollection>
    </JSONLD>
  );
};

export default FaqStructuredData;
