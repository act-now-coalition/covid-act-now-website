import React, { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { sortBy, without } from 'lodash';
import { BreadcrumbsContainer } from '../Learn.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { StyledAccordion } from 'components/SharedComponents';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';
import { MarkdownContent, Heading1 } from 'components/Markdown';
import PageContent from 'components/PageContent';
import { glossaryContent, Term, learnPages } from 'cms-content/learn';
import Breadcrumbs from 'components/Breadcrumbs';
import { Anchor } from 'components/TableOfContents';
import { formatMetatagDate } from 'common/utils';

import styled from 'styled-components';

const ItemHeader = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.25rem;
  font-weight: 500;
`;

const ItemContent = styled(MarkdownContent)`
  padding-left: 12px;
`;

const GlossaryItem = (props: { item: Term }) => {
  const { item } = props;
  console.log('item', props.item);
  return (
    <Fragment>
      <ItemHeader>{item.term}</ItemHeader>
      <ItemContent source={item.definition} />
      <br />
    </Fragment>
  );
};

const Glossary: React.FC = () => {
  const {
    header,
    intro,
    terms,
    metadataTitle,
    metadataDescription,
  } = glossaryContent;

  const date = formatMetatagDate();

  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { hash } = useLocation();

  function onChangeExpandedTerm(termId: string, expanded: boolean) {
    if (expanded) {
      // Only track when users open the accordion
      trackEvent(EventCategory.GLOSSARY, EventAction.EXPAND, `Term: ${termId}`);
    }

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
    <Fragment>
      <AppMetaTags
        canonicalUrl="/glossary"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <Heading1>{header}</Heading1>
        <MarkdownContent source={intro} />
        {terms.map((item: Term) => (
          <Fragment key={item.termId}>
            <Anchor id={item.termId} />
            <GlossaryItem item={item} />
            {/* <StyledAccordion
              summaryText={item.term}
              detailText={item.definition}
              expanded={isExpanded(item.termId)}
              onChange={(event: {}, expanded: boolean) =>
                onChangeExpandedTerm(item.termId, expanded)
              }
            /> */}
          </Fragment>
        ))}
      </PageContent>
    </Fragment>
  );
};

export default Glossary;
