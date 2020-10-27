import React, { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { sortBy, without } from 'lodash';
import {
  PageContainer,
  PageHeader,
  PageContent,
  BreadcrumbsContainer,
  PageIntro,
} from '../Learn.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { StyledAccordion } from 'components/SharedComponents';
import { glossaryContent, Term } from 'cms-content/learn';
import Breadcrumbs from 'components/Breadcrumbs';
import { BreadcrumbItem } from 'components/Breadcrumbs';
import { Anchor } from 'components/TableOfContents';
import { formatNumericalDate } from 'common/utils';

const glossaryHeader = glossaryContent.header;
const glossaryIntro = glossaryContent.intro;
const glossaryTerms = glossaryContent.terms;

export const breadcrumbItems: BreadcrumbItem[] = [
  { to: '/learn', label: 'Learn' },
  { to: '/glossary', label: 'Glossary' },
];

const date = formatNumericalDate(new Date());

const Glossary = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { hash } = useLocation();

  function onChangeExpandedTerm(termId: string, expanded: boolean) {
    const newExpandedItems = expanded
      ? [...expandedItems, termId]
      : without(expandedItems, termId);
    setExpandedItems(sortBy(newExpandedItems));
  }

  function isExpanded(termId: string) {
    // Always expand the term in the URL hash
    return (
      expandedItems.includes(termId) ||
      (hash.length > 0 && `#${termId}` === hash)
    );
  }

  return (
    <PageContainer>
      <AppMetaTags
        canonicalUrl="/glossary"
        pageTitle="Glossary of COVID-19 Terminology - Covid Act Now"
        pageDescription={`${date} Find clear definitions of the vocabulary and key terms of the novel Coronavirus (2019-nCoV). Understand the COVID terminology and make informed decisions to stop the pandemic.`}
      />
      <PageContent>
        <BreadcrumbsContainer>
          <Breadcrumbs pathItems={breadcrumbItems} />
        </BreadcrumbsContainer>
        <PageHeader>{glossaryHeader}</PageHeader>
        <PageIntro source={glossaryIntro} />
        {glossaryTerms.map((item: Term) => (
          <Fragment key={item.termId}>
            <Anchor id={item.termId} />
            <StyledAccordion
              summaryText={item.term}
              detailText={item.definition}
              expanded={isExpanded(item.termId)}
              onChange={(event: {}, expanded) =>
                onChangeExpandedTerm(item.termId, expanded)
              }
            />
          </Fragment>
        ))}
      </PageContent>
    </PageContainer>
  );
};

export default Glossary;
