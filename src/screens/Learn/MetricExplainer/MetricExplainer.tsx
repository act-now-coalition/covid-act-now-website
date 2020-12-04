import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import {
  metricExplainersContent,
  introSection,
  metricSections,
  learnPages,
} from 'cms-content/learn';
import {
  Heading2,
  MarkdownContent,
  Heading3,
  Paragraph,
} from 'components/Markdown';
import PageContent, { MobileOnly } from 'components/PageContent';
import Breadcrumbs from 'components/Breadcrumbs';
import { BreadcrumbsContainer, LearnHeading1, ItemName } from '../Learn.style';
import TableOfContents from 'components/TableOfContents';

const MetricExplainer = () => {
  const {
    pageHeader,
    pageIntro,
    metricsHeader,
    metricsID,
    frameworkHeader,
    frameworkID,
    frameworkBody,
    riskHeader,
    riskID,
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
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>{pageHeader}</LearnHeading1>
        <MarkdownContent source={pageIntro} />
        <MobileOnly>
          <TableOfContents items={[]} />
        </MobileOnly>
        <Heading2 id={riskID}>{riskHeader}</Heading2>
        <MarkdownContent source={introSection[0].sectionIntro} />
        <p>** Insert thermometer **</p>
        {introSection[0].questions.map((question: any) => (
          <Fragment>
            <ItemName>{question.question}</ItemName>
            <MarkdownContent source={question.answer} />
          </Fragment>
        ))}
        <Heading2 id={metricsID}>{metricsHeader}</Heading2>
        {metricSections.map((section: any) => (
          <Fragment>
            <Heading3>{section.sectionHeader}</Heading3>
            {section.sectionSubheader && (
              <Paragraph>{section.sectionSubheader}</Paragraph>
            )}
            <p>** Insert thermometer **</p>
            {section.questions.map((question: any) => (
              <Fragment>
                <ItemName>{question.question}</ItemName>
                <MarkdownContent source={question.answer} />
              </Fragment>
            ))}
          </Fragment>
        ))}
        <Heading2 id={frameworkID}>{frameworkHeader}</Heading2>
        <MarkdownContent source={frameworkBody} />
      </PageContent>
    </Fragment>
  );
};

export default MetricExplainer;
