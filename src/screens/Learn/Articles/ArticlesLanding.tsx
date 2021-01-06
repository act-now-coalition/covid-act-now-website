import React, { Fragment } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import PageContent from 'components/PageContent';
import { Heading2, Paragraph } from 'components/Markdown';
import { formatMetatagDate } from 'common/utils';
import { learnPages } from 'cms-content/learn';
import { BreadcrumbsContainer, LearnHeading1 } from '../Learn.style';
import articles, { Article } from 'cms-content/articles';
import { StyledLink } from '../CaseStudies/CaseStudyCard.style';
import SectionButton, { ButtonTheme } from '../Landing/SectionButton';
import { ButtonContainer } from '../Learn.style';

const ArticlesLanding = () => {
  let { url } = useRouteMatch();
  const date = formatMetatagDate();

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/deep-dives"
        pageTitle="COVID-19 Deep Dives"
        pageDescription={`${date} Explore deeper analysis about how, why, and where COVID is spreading.`}
      />
      <PageContent sidebarItems={learnPages}>
        <BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/learn', label: 'Learn' }} />
        </BreadcrumbsContainer>
        <LearnHeading1>Deep dives</LearnHeading1>
        {articles.map((article: Article) => {
          return (
            <Fragment key={article.articleID}>
              <StyledLink to={`${url}/${article.articleID}`}>
                <Heading2>{article.header}</Heading2>
              </StyledLink>
              <Paragraph>{article.summary}</Paragraph>
              <ButtonContainer>
                <SectionButton
                  cta="Learn more"
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
