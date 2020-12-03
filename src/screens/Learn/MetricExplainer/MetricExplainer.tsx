import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { metricExplainersContent, introSection } from 'cms-content/learn';
import { Heading2, MarkdownContent } from 'components/Markdown';
import PageContent from 'components/PageContent';
import Breadcrumbs from 'components/Breadcrumbs';
import { BreadcrumbsContainer, LearnHeading1 } from '../Learn.style';

const MetricExplainer = () => {
  const {
    pageHeader,
    pageIntro,
    metricsHeader,
    metricsID,
    frameworkHeader,
    frameworkID,
    frameworkBody,
    metadataTitle,
    metadataDescription,
  } = metricExplainersContent;

  console.log('introSection', introSection);
  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/metric-explainer"
        pageTitle=""
        pageDescription=""
      />
      <PageContent sidebarItems={[]}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>{pageHeader}</LearnHeading1>
        <MarkdownContent source={pageIntro} />
        <Heading2>{metricsHeader}</Heading2>
        <MarkdownContent source={introSection[0].sectionIntro} />
      </PageContent>
    </Fragment>
  );
};

export default MetricExplainer;
