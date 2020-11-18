import React, { Fragment } from 'react';
import { SectionName, ItemName, ItemsContainer } from '../Learn.style';
import { MarkdownContent } from 'components/Markdown';
import { Anchor } from 'components/TableOfContents';
import { FaqSection, Question } from 'cms-content/learn';

const Section = (props: { section: FaqSection }) => {
  const { section } = props;
  return (
    <Fragment>
      <Anchor id={section.sectionId} />
      <SectionName>{section.sectionTitle}</SectionName>
      <ItemsContainer>
        {section.questions.map((question: Question, i: number) => (
          <Fragment key={`faq-question-${i}`}>
            <ItemName>{question.question}</ItemName>
            <MarkdownContent source={question.answer} />
          </Fragment>
        ))}
      </ItemsContainer>
    </Fragment>
  );
};

export default Section;
