import React, { Fragment } from 'react';
import { StyledAccordion } from 'components/SharedComponents';
import { SectionHeader } from './Faq.style';
import { Section, Question } from 'cms-content/learn';
import { Anchor } from 'components/TableOfContents';
// import { trackEvent, EventCategory, EventAction } from 'components/Analytics';

function trackExpandQuestion(question: string) {
  // TODO: Use question IDs or labels instead of the text of the question
  // trackEvent(EventCategory.FAQ, EventAction.EXPAND, question);
}

const FaqSection = (props: { content: Section }) => {
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
          onExpand={trackExpandQuestion}
        />
      ))}
    </Fragment>
  );
};

export default FaqSection;
