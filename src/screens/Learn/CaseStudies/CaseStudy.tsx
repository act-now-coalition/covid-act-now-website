import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  caseStudiesById,
  getCaseStudyCategory,
  getMoreStudies,
} from 'cms-content/learn';
import * as Style from '../Learn.style';
import {
  Logo,
  LearnMoreSection,
  LearnMoreTitle,
  LearnMoreBody,
} from './CaseStudy.style';
import Breadcrumbs from 'components/Breadcrumbs';
import { BodyCopyMarkdown } from '../Learn.style';

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
        <Style.PageHeader>{header}</Style.PageHeader>
        <Logo src={caseStudy.logoUrl} alt={caseStudy.logoAltText} />
        <BodyCopyMarkdown source={author} />
        <BodyCopyMarkdown source={body} />
        {studyCategory && otherCaseStudies.length > 0 && (
          <LearnMoreSection>
            <LearnMoreTitle>{`More ${studyCategory.header.toLowerCase()} studies`}</LearnMoreTitle>
            <LearnMoreBody>
              <ul>
                {otherCaseStudies.map(study => (
                  <li key={study.caseStudyId}>
                    <Link to={`/case-studies/${study.caseStudyId}`}>
                      {study.header}
                    </Link>
                  </li>
                ))}
              </ul>
            </LearnMoreBody>
          </LearnMoreSection>
        )}
      </Style.PageContent>
    </Style.PageContainer>
  );
};

export default CaseStudy;
