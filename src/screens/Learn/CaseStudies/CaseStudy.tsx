import React, { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatMetatagDate } from 'common/utils';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import {
  MarkdownContent,
  Heading1,
  Heading2,
  MarkdownStyleContainer,
} from 'components/Markdown';
import PageContent from 'components/PageContent';
import {
  caseStudiesById,
  getCaseStudyCategory,
  getMoreStudies,
  learnPages,
  caseStudiesContent,
} from 'cms-content/learn';
import * as Style from '../Learn.style';
import {
  Logo,
  LogoContainer,
  LearnMoreSection,
  Author,
} from './CaseStudy.style';

const { metadataDescription } = caseStudiesContent;

const CaseStudy: React.FC = () => {
  let { caseStudyId } = useParams<{ caseStudyId: string }>();
  const date = formatMetatagDate();
  const caseStudy = caseStudiesById[caseStudyId];

  if (!caseStudy) {
    return null;
  }

  const { header, body, author } = caseStudy;
  const studyCategory = getCaseStudyCategory(caseStudyId);
  const otherCaseStudies = getMoreStudies(caseStudyId);
  const fullAuthorText = `By ${author}`;

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl={`/case-studies/${caseStudyId}`}
        pageTitle={`Case Study: ${caseStudy.shortTitle}`}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent sidebarItems={learnPages}>
        <Style.BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/case-studies', label: 'Case Studies' }} />
        </Style.BreadcrumbsContainer>
        <Heading1>{header}</Heading1>
        <LogoContainer>
          <Logo src={caseStudy.logoUrl} alt={caseStudy.logoAltText} />
        </LogoContainer>
        <Author source={fullAuthorText} />
        <MarkdownContent source={body} />
        {studyCategory && otherCaseStudies.length > 0 && (
          <LearnMoreSection>
            <Heading2>Similar case studies</Heading2>
            <MarkdownStyleContainer>
              <ul>
                {otherCaseStudies.map(study => (
                  <li key={study.caseStudyId}>
                    <Link to={`/case-studies/${study.caseStudyId}`}>
                      {study.header}
                    </Link>
                  </li>
                ))}
              </ul>
            </MarkdownStyleContainer>
          </LearnMoreSection>
        )}
      </PageContent>
    </Fragment>
  );
};

export default CaseStudy;
