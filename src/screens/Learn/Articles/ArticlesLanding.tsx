import React, { Fragment } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import PageContent from 'components/PageContent';
import { MarkdownContent, Heading2 } from 'components/Markdown';
import { formatMetatagDate } from 'common/utils';
import { learnPages } from 'cms-content/learn';
import { BreadcrumbsContainer, LearnHeading1 } from '../Learn.style';
import articles from 'cms-content/articles';
import { StyledLink } from '../CaseStudies/CaseStudyCard.style';
import SectionButton, { ButtonTheme } from '../Landing/SectionButton';
import { ButtonContainer } from '../Learn.style';

const ArticlesLanding = () => {
  let { url } = useRouteMatch();
  const date = formatMetatagDate();

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/articles"
        pageTitle={''}
        pageDescription={`${date} ${''}`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>Articles</LearnHeading1>
        <MarkdownContent source={'Articles intro'} />
        {articles.map(article => {
          return (
            <Fragment>
              <StyledLink to={`${url}${article.articleID}`}>
                <Heading2>{article.header}</Heading2>
              </StyledLink>
              <ButtonContainer>
                <SectionButton
                  cta="Read on"
                  redirect={`${url}/${article.articleID}`}
                  theme={ButtonTheme.WHITE}
                />
              </ButtonContainer>
            </Fragment>
          );
        })}
      </PageContent>
    </Fragment>
  );
};

export default ArticlesLanding;
