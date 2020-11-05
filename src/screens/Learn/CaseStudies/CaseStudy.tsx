import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import Breadcrumbs from 'components/Breadcrumbs';
import { formatMetatagDate } from 'common/utils';
import {
  MarkdownContent,
  Heading1,
  Heading2,
  MarkdownStyleContainer,
} from 'components/Markdown';
import {
  caseStudiesById,
  getCaseStudyCategory,
  getMoreStudies,
} from 'cms-content/learn';
import * as Style from '../Learn.style';
import LearnPageContainer from '../LearnPageContainer';
import { Logo, LearnMoreSection, Author } from './CaseStudy.style';

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
    <LearnPageContainer>
      <AppMetaTags
        canonicalUrl={`/case-studies/${caseStudyId}`}
        pageTitle={`Case Study: ${caseStudy.shortTitle}`}
        pageDescription={`${date} Learn how different people are using Covid Act Now's data to make decisions for themselves, their organizations, and their communities during COVID`}
      />
      <Style.BreadcrumbsContainer>
        <Breadcrumbs item={{ to: '/case-studies', label: 'Case Studies' }} />
      </Style.BreadcrumbsContainer>
      <Heading1>{header}</Heading1>
      <Logo src={caseStudy.logoUrl} alt={caseStudy.logoAltText} />
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
    </LearnPageContainer>
  );
};

export default CaseStudy;
