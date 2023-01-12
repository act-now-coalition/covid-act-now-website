import React, { Fragment, useState } from 'react';
import { formatMetatagDate } from 'common/utils';
import TableOfContents, { Item } from 'components/TableOfContents';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import { MarkdownContent } from 'components/Markdown';
import PageContent, { MobileOnly } from 'components/PageContent';
import { faqContent, FaqSection, learnPages } from 'cms-content/learn';
import {
  BreadcrumbsContainer,
  LearnHeading1,
  LastUpdatedDate,
} from '../Learn.style';
import Section from './Section';
import { useScrollToTopButton } from 'common/hooks';
import ScrollToTopButton from 'components/SharedComponents/ScrollToTopButton';
import { EventCategory } from 'components/Analytics';
import FaqStructuredData from './FaqStructuredData';
import Footer from 'screens/Learn/Footer/Footer';
import {
  DateFormat,
  parseDateString,
  formatDateTime,
} from '@actnowcoalition/time-utils';
import LearnDisclaimer from 'components/LearnDisclaimer/LearnDisclaimer';

const Faq: React.FC = () => {
  const {
    header,
    intro,
    lastUpdatedDate,
    sections,
    metadataTitle,
    metadataDescription,
  } = faqContent;
  const date = formatMetatagDate();

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const showScrollToTopButton = useScrollToTopButton(
    showScrollToTop,
    setShowScrollToTop,
  );

  function getSectionItems(sections: FaqSection[]): Item[] {
    return sections.map(section => ({
      id: section.sectionId,
      title: section.sectionTitle,
    }));
  }

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/faq"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <FaqStructuredData />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>{header}</LearnHeading1>
        <LearnDisclaimer />
        {intro && <MarkdownContent source={intro} />}
        <LastUpdatedDate>
          Last updated{' '}
          {formatDateTime(
            parseDateString(lastUpdatedDate),
            DateFormat.MM_DD_YYYY,
          )}
        </LastUpdatedDate>
        <MobileOnly>
          <TableOfContents items={getSectionItems(sections)} />
        </MobileOnly>
        {sections.map((section: FaqSection) => (
          <Section key={section.sectionId} section={section} />
        ))}
        <Footer />
        <ScrollToTopButton
          showButton={showScrollToTopButton}
          analyticsCategory={EventCategory.FAQ}
        />
      </PageContent>
    </Fragment>
  );
};

export default Faq;
