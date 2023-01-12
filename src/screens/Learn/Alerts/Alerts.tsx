import React, { Fragment } from 'react';
import { BreadcrumbsContainer, LearnHeading1 } from '../Learn.style';
import { ButtonWrapper } from './Alerts.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { MarkdownContent } from 'components/Markdown';
import PageContent from 'components/PageContent';
import { learnPages } from 'cms-content/learn';
import Breadcrumbs from 'components/Breadcrumbs';
import { formatMetatagDate } from 'common/utils';
import Footer from 'screens/Learn/Footer/Footer';
import { aboutOurAlertsContent } from 'cms-content/learn';
import { LargeOutlinedButton } from 'components/ButtonSystem';
import { EventCategory } from 'components/Analytics';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LearnDisclaimer from 'components/LearnDisclaimer/LearnDisclaimer';

const Alerts: React.FC = () => {
  const {
    pageHeader,
    bodyText,
    bodyImages,
    metadataTitle,
    metadataDescription,
  } = aboutOurAlertsContent;

  const date = formatMetatagDate();

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/research-rundown-archive"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>{pageHeader}</LearnHeading1>
        <LearnDisclaimer />
        <MarkdownContent source={bodyText} />
        <ButtonWrapper>
          <LargeOutlinedButton
            href="https://docs.google.com/spreadsheets/d/1JYl0YtoyDbvaCvuY2oF1oAPpIWRLKJJw4aaAS93YgP4"
            endIcon={<ArrowForwardIcon />}
            trackingCategory={EventCategory.LEARN}
            trackingLabel="Read the archive"
          >
            Read the archive
          </LargeOutlinedButton>
        </ButtonWrapper>
        <MarkdownContent source={bodyImages} />
        <Footer />
      </PageContent>
    </Fragment>
  );
};

export default Alerts;
