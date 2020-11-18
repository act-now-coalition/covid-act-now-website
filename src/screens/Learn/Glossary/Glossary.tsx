import React, { Fragment, useEffect, useState } from 'react';
import { BreadcrumbsContainer } from '../Learn.style';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { MarkdownContent, Heading1 } from 'components/Markdown';
import PageContent from 'components/PageContent';
import { glossaryContent, learnPages } from 'cms-content/learn';
import Breadcrumbs from 'components/Breadcrumbs';
import { Anchor } from 'components/TableOfContents';
import { formatMetatagDate } from 'common/utils';
import ScrollToTopButton from 'components/SharedComponents/ScrollToTopButton';
import useScrollPosition from '@react-hook/window-scroll';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { SectionName } from '../Shared/MappedSection.style';

const Glossary: React.FC = () => {
  const {
    header,
    intro,
    terms,
    metadataTitle,
    metadataDescription,
  } = glossaryContent;

  const scrollY = useScrollPosition();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    if (isMobile && scrollY > 400) {
      setShowScrollToTop(true);
    } else setShowScrollToTop(false);
  }, [isMobile, scrollY, setShowScrollToTop, showScrollToTop]);

  const date = formatMetatagDate();

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
        {terms.map((term: any) => (
          <Fragment>
            <Anchor id={term.termId} />
            <SectionName>{term.term}</SectionName>
            <MarkdownContent source={term.definition} />
          </Fragment>
        ))}
        <ScrollToTopButton showButton={showScrollToTop} />
      </PageContent>
    </Fragment>
  );
};

export default Glossary;
