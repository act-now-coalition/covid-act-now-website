import React, { Fragment } from 'react';
import { Wrapper, PageHeader, PageIntroParagraph } from '../Learn.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { StyledAccordion } from 'components/SharedComponents';

const Glossary = () => {
  // stand-in content:
  const header = 'Glossary';
  const terms = [
    { term: 'term 1', termId: 'id 1', defintion: 'definition 1' },
    { term: 'term 2', termId: 'id 2', defintion: 'definition 2' },
    { term: 'term 3', termId: 'id 3', defintion: 'definition 3' },
  ];
  const intro =
    'We have compiled a simple glossary of essential COVID-related terms, which we will continue to update and expand.';

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/glossary"
        pageTitle="COVID-19 Glossary & Key terms - America's COVID warning system - Covid Act Now"
        pageDescription="Find trusted information about Coronavirus (2019-nCoV). Make informed decisions to stop the disease for you and your community."
      />
      <Wrapper>
        <PageHeader>{header}</PageHeader>
        <PageIntroParagraph>{intro}</PageIntroParagraph>
        {terms.map(item => (
          <StyledAccordion
            key={item.termId}
            summaryText={item.term}
            detailText={item.defintion}
          />
        ))}
      </Wrapper>
    </Fragment>
  );
};

export default Glossary;
