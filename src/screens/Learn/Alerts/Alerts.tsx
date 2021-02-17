import React, { Fragment } from 'react';
import {
  BreadcrumbsContainer,
  SectionName,
  LearnHeading1,
} from '../Learn.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { MarkdownContent } from 'components/Markdown';
import PageContent from 'components/PageContent';
import { learnPages } from 'cms-content/learn';
import Breadcrumbs from 'components/Breadcrumbs';
import { formatMetatagDate } from 'common/utils';
import Footer from 'screens/Learn/Footer/Footer';
import { aboutOurAlertsContent } from 'cms-content/learn';

const Alerts: React.FC = () => {
  const { pageHeader, sections } = aboutOurAlertsContent;

  const date = formatMetatagDate();

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/covid-risk-vaccine-alerts"
        pageTitle={' '}
        pageDescription={`${date}`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>{pageHeader}</LearnHeading1>
        {sections.map((section: any, i: number) => (
          <Fragment key={i}>
            <SectionName id={section.sectionId}>
              {section.sectionHeader}
            </SectionName>
            <MarkdownContent source={section.sectionBody} />
          </Fragment>
        ))}
        <Footer />
      </PageContent>
    </Fragment>
  );
};

export default Alerts;
