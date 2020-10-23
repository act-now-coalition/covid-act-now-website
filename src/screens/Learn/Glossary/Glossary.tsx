import React, { Fragment } from 'react';
import {
  PageContainer,
  PageHeader,
  PageIntro,
  PageContent,
  BreadcrumbsContainer,
} from '../Learn.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { StyledAccordion } from 'components/SharedComponents';
import { glossaryContent, Term } from 'cms-content/learn';
import Breadcrumbs from 'components/Breadcrumbs';
import { BreadcrumbItem } from 'components/Breadcrumbs';
import { Anchor } from 'components/TableOfContents';

const glossaryHeader = glossaryContent.header;
const glossaryIntro = glossaryContent.intro;
const glossaryTerms = glossaryContent.terms;

export const breadcrumbItems: BreadcrumbItem[] = [
  { to: '/learn', label: 'Learn' },
  { to: '/glossary', label: 'Glossary' },
];

const Glossary = () => {
  return (
    <PageContainer>
      <AppMetaTags
        canonicalUrl="/glossary"
        pageTitle="COVID-19 Glossary & Key terms - America's COVID warning system - Covid Act Now"
        pageDescription="Find trusted information about Coronavirus (2019-nCoV). Make informed decisions to stop the disease for you and your community."
      />
      <PageContent>
        <BreadcrumbsContainer>
          <Breadcrumbs pathItems={breadcrumbItems} />
        </BreadcrumbsContainer>
        <PageHeader>{glossaryHeader}</PageHeader>
        <PageIntro>{glossaryIntro}</PageIntro>
        {glossaryTerms.map((item: Term) => (
          <Fragment key={item.termId}>
            <Anchor id={item.termId} />
            <StyledAccordion
              summaryText={item.term}
              detailText={item.definition}
            />
          </Fragment>
        ))}
      </PageContent>
    </PageContainer>
  );
};

export default Glossary;
