import React, { Fragment } from 'react';
import { StyledAccordion } from 'components/SharedComponents';
import { SectionHeader } from './Faq.style';
import { FaqSection, Question } from 'cms-content/learn';
import { Anchor } from 'components/TableOfContents';

const Section = (props: { content: FaqSection }) => {
  const { content } = props;
  const { sectionTitle, questions } = content;

  return (
    <Fragment>
      <SectionHeader>
        <Anchor id={content.sectionId} />
        {sectionTitle}
      </SectionHeader>
      {questions.map((item: Question, i: number) => (
        <StyledAccordion
          key={`accordion-question-${i}`}
          summaryText={item.question}
          detailText={item.answer}
        />
      ))}
    </Fragment>
  );
};

export default Section;
