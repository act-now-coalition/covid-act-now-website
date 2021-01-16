import React, { Fragment, useState } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import {
  metricExplainersContent,
  introSection,
  metricSections,
  learnPages,
} from 'cms-content/learn';
import { MarkdownContent } from 'components/Markdown';
import PageContent, { MobileOnly } from 'components/PageContent';
import Breadcrumbs from 'components/Breadcrumbs';
import { BreadcrumbsContainer, LearnHeading1, ItemName } from '../Learn.style';
import TableOfContents, { Item } from 'components/TableOfContents';
import { Metric, getMetricDefinition } from 'common/metric';
import { ThermometerBox } from 'components/Thermometer';
import ThermometerIntro from './ThermometerIntro';
import { ExplainersHeading2 } from './MetricExplainer.style';
import { useScrollToTopButton } from 'common/hooks';
import ScrollToTopButton from 'components/SharedComponents/ScrollToTopButton';
import { EventCategory } from 'components/Analytics';
import GovLogoGrid from 'screens/About/GovLogoGrid';
import Footer from 'screens/Learn/Footer/Footer';

const MetricExplainer = () => {
  const {
    pageHeader,
    pageIntro,
    sections,
    frameworkLogos,
    metadataTitle,
    metadataDescription,
  } = metricExplainersContent;

  function getSectionItems(sections: any[]): Item[] {
    return sections.map(section => ({
      id: section.sectionId,
      title: section.sectionHeader,
    }));
  }

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const showScrollToTopButton = useScrollToTopButton(
    showScrollToTop,
    setShowScrollToTop,
  );

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/covid-risk-levels-metrics"
        pageTitle={metadataTitle}
        pageDescription={metadataDescription}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>{pageHeader}</LearnHeading1>
        {pageIntro && <MarkdownContent source={pageIntro} />}
        <MobileOnly>
          <TableOfContents items={getSectionItems(sections)} />
        </MobileOnly>
        <ExplainersHeading2 id={introSection[0].sectionId}>
          {introSection[0].sectionHeader}
        </ExplainersHeading2>
        <MarkdownContent source={introSection[0].sectionIntro} />
        <ThermometerIntro />
        {introSection[0].questions.map(question => (
          <Fragment key={question.questionId}>
            <ItemName>{question.question}</ItemName>
            <MarkdownContent source={question.answer} />
          </Fragment>
        ))}
        <GovLogoGrid logos={frameworkLogos} />
        {metricSections.map(section => (
          <Fragment key={section.sectionId}>
            <ExplainersHeading2 id={section.sectionId}>
              {section.sectionHeader}
            </ExplainersHeading2>
            <MarkdownContent source={section.sectionIntro} />
            <ThermometerBox>{getThermometer(section.sectionId)}</ThermometerBox>
            {section.questions.map(question => (
              <Fragment key={question.questionId}>
                <ItemName>{question.question}</ItemName>
                <MarkdownContent source={question.answer} />
              </Fragment>
            ))}
          </Fragment>
        ))}
        <Footer />
        <ScrollToTopButton
          showButton={showScrollToTopButton}
          analyticsCategory={EventCategory.METRIC_EXPLAINERS}
        />
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
    'icu-capacity-used': Metric.HOSPITAL_USAGE,
    // NOTE: No thermometer for 'vaccinations' since we don't grade it yet.
  };

  const metric = mapSectionIdMetric[sectionId];
  return metric !== undefined
    ? getMetricDefinition(metric).renderThermometer()
    : null;
}

export default MetricExplainer;
