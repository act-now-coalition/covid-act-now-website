import React, { Fragment } from 'react';
import { Term, TermsByCategory } from 'cms-content/learn';
import { SectionName, ItemName, ItemsContainer } from './MappedSection.style';
import { MarkdownContent } from 'components/Markdown';

const MappedSection = (props: { category: TermsByCategory }) => {
  const { category } = props;
  return (
    <Fragment>
      <SectionName>{category.categoryName}</SectionName>
      <ItemsContainer>
        {category.terms.map((term: Term) => (
          <Fragment>
            <ItemName>{term.term}</ItemName>
            <MarkdownContent source={term.definition} />
          </Fragment>
        ))}
      </ItemsContainer>
    </Fragment>
  );
};

export default MappedSection;
