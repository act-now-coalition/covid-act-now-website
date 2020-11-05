import React, { Fragment } from 'react';
import { StyledAccordion } from 'components/SharedComponents';
import { FaqSection, Question } from 'cms-content/learn';
import { Anchor } from 'components/TableOfContents';
import { Heading2 } from 'components/Markdown';

const Section = (props: { content: FaqSection }) => {
  const { content } = props;
  const { sectionTitle, questions } = content;

  return (
    <Fragment>
      <Heading2>
        <Anchor id={content.sectionId} />
        {sectionTitle}
      </Heading2>
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
