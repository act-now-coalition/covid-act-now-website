import React, { Fragment, useState } from 'react';
import { formatMetatagDate } from 'common/utils';
import TableOfContents, { Item } from 'components/TableOfContents';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import { MarkdownContent } from 'components/Markdown';
import PageContent, { MobileOnly } from 'components/PageContent';
import { faqContent, FaqSection, learnPages } from 'cms-content/learn';
import { BreadcrumbsContainer, LearnHeading1 } from '../Learn.style';
import Section from './Section';
import { useScrollToTopButton } from 'common/hooks';
import ScrollToTopButton from 'components/SharedComponents/ScrollToTopButton';
import { EventCategory } from 'components/Analytics';

const Faq: React.FC = () => {
  const {
    header,
    intro,
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
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>{header}</LearnHeading1>
        <MarkdownContent source={intro} />
        <MobileOnly>
          <TableOfContents items={getSectionItems(sections)} />
        </MobileOnly>
        {sections.map((section: FaqSection) => (
          <Section key={section.sectionId} section={section} />
        ))}
        <ScrollToTopButton
          showButton={showScrollToTopButton}
          analyticsCategory={EventCategory.FAQ}
        />
      </PageContent>
    </Fragment>
  );
};

export default Faq;
