import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  caseStudiesById,
  getCaseStudyCategory,
  getMoreStudies,
} from 'cms-content/learn';
import * as Style from '../Learn.style';
import { Logo, LearnMoreSection, Author } from './CaseStudy.style';
import Breadcrumbs from 'components/Breadcrumbs';
import {
  MarkdownContent,
  Heading1,
  Heading2,
  MarkdownStyleContainer,
} from 'components/Markdown';

const CaseStudy: React.FC = () => {
  let { caseStudyId } = useParams<{ caseStudyId: string }>();

  const caseStudy = caseStudiesById[caseStudyId];

  if (!caseStudy) {
    return null;
  }

  const { header, body, author } = caseStudy;
  const studyCategory = getCaseStudyCategory(caseStudyId);
  const otherCaseStudies = getMoreStudies(caseStudyId);

  return (
    <Style.PageContainer>
      <Style.PageContent>
        <Style.BreadcrumbsContainer>
          <Breadcrumbs item={{ to: '/case-studies', label: 'Case Studies' }} />
        </Style.BreadcrumbsContainer>
        <Heading1>{header}</Heading1>
        <Logo src={caseStudy.logoUrl} alt={caseStudy.logoAltText} />
        <Author source={author} />
        <MarkdownContent source={body} />
        {studyCategory && otherCaseStudies.length > 0 && (
          <LearnMoreSection>
            <Heading2>{`More ${studyCategory.header.toLowerCase()} studies`}</Heading2>
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
      </Style.PageContent>
    </Style.PageContainer>
  );
};

export default CaseStudy;
