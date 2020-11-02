import React from 'react';
import { useParams } from 'react-router-dom';
import { caseStudiesById } from 'cms-content/learn';
import * as Style from '../Learn.style';
import { Logo } from './CaseStudy.style';
import Breadcrumbs from 'components/Breadcrumbs';
import { BodyCopyMarkdown } from '../Learn.style';

const CaseStudy: React.FC = () => {
  let { caseStudyId } = useParams<{ caseStudyId: string }>();

  const caseStudy = caseStudiesById[caseStudyId];

  if (!caseStudy) {
    return null;
  }

  const { header, body, author } = caseStudy;

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
      </Style.PageContent>
    </Style.PageContainer>
  );
};

export default CaseStudy;
