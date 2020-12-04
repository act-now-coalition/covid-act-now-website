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
import { Metric, getMetricDefinition } from 'common/metric';
import { ThermometerBox } from 'components/Thermometer';

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
        {introSection[0].questions.map(question => (
          <Fragment key={question.questionId}>
            <ItemName>{question.question}</ItemName>
            <MarkdownContent source={question.answer} />
          </Fragment>
        ))}
        <Heading2 id={metricsID}>{metricsHeader}</Heading2>
        {metricSections.map(section => (
          <Fragment key={section.sectionId}>
            <Heading3 id={section.sectionId}>{section.sectionHeader}</Heading3>
            {section.sectionSubheader && (
              <Paragraph>{section.sectionSubheader}</Paragraph>
            )}
            <ThermometerBox>{getThermometer(section.sectionId)}</ThermometerBox>
            {section.questions.map(question => (
              <Fragment key={question.questionId}>
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

function getThermometer(sectionId: string) {
  // TODO(pablo): This map depends on the IDs entered by the user on the
  // CMS, I'm not sure how to make it better
  const mapSectionIdMetric: { [key: string]: Metric } = {
    'daily-new-cases': Metric.CASE_DENSITY,
    'infection-rate': Metric.CASE_GROWTH_RATE,
    'positive-test-rate': Metric.POSITIVE_TESTS,
    'icu-headroom-used': Metric.HOSPITAL_USAGE,
    'contact-tracers-hired': Metric.CONTACT_TRACING,
  };

  const metric = mapSectionIdMetric[sectionId];
  return metric !== undefined
    ? getMetricDefinition(metric).renderThermometer()
    : null;
}

export default MetricExplainer;
