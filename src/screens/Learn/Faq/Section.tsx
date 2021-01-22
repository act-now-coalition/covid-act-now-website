import React, { Fragment } from 'react';
import { SectionName, ItemName, ItemsContainer } from '../Learn.style';
import { MarkdownContent } from 'components/Markdown';
import { FaqSection, Question } from 'cms-content/learn';

const Section = (props: { section: FaqSection }) => {
  const { section } = props;
  return (
    <Fragment>
      <SectionName id={section.sectionId}>{section.sectionTitle}</SectionName>
      <ItemsContainer>
        {section.questions.map((question: Question, i: number) => (
          <Fragment key={`faq-question-${i}`}>
            <ItemName id={question.questionId}>{question.question}</ItemName>
            <MarkdownContent source={question.answer} />
          </Fragment>
        ))}
      </ItemsContainer>
    </Fragment>
  );
};

export default Section;
