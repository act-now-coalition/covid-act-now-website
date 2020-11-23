import React, { Fragment } from 'react';
import { useRouteMatch } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import PageContent, { MobileOnly } from 'components/PageContent';
import { MarkdownContent, Heading2 } from 'components/Markdown';
import { formatMetatagDate } from 'common/utils';
import {
  caseStudiesContent,
  learnPages,
  CaseStudyCategory,
} from 'cms-content/learn';
// import CaseStudyCard from './CaseStudyCard';
import { BreadcrumbsContainer, LearnHeading1 } from '../Learn.style';
// import { CardsContainer } from './CaseStudy.style';
import TableOfContents, { Item } from 'components/TableOfContents';

const ArticlesLanding = () => {
  const date = formatMetatagDate();

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/case-studies"
        pageTitle={''}
        pageDescription={`${date} ${''}`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>Articles</LearnHeading1>
        <MarkdownContent source={'Articles intro'} />
        {/* <MobileOnly>
          <TableOfContents items={getSectionItems(categories)} />
        </MobileOnly> */}
      </PageContent>
    </Fragment>
  );
};

export default ArticlesLanding;
