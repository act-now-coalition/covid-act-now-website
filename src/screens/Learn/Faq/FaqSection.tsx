import React, { Fragment } from 'react';
import { StyledAccordion } from 'components/SharedComponents';
import { SectionHeader } from './Faq.style';
import { Section, Question } from 'cms-content/learn';

const FaqSection = (props: { content: Section }) => {
  const { content } = props;
  const { sectionTitle, questions } = content;

  return (
    <Fragment>
      <SectionHeader>{sectionTitle}</SectionHeader>
      {questions.map((item: Question, i: number) => (
        <StyledAccordion summaryText={item.question} detailText={item.answer} />
      ))}
    </Fragment>
  );
};

export default FaqSection;
