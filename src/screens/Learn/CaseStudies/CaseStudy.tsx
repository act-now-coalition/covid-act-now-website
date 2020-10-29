import React from 'react';
import { useParams } from 'react-router-dom';
import { caseStudiesById } from 'cms-content/learn';
import { MarkdownContent } from 'components/Markdown';
import * as Style from '../Learn.style';
import Breadcrumbs from 'components/Breadcrumbs';

const CaseStudy: React.FC = () => {
  let { caseStudyId } = useParams<{ caseStudyId: string }>();

  const caseStudy = caseStudiesById[caseStudyId];
  const { header, body, author, tags } = caseStudy;

  return (
    <Style.PageContainer>
      <Style.PageContent>
        <Breadcrumbs
          item={{ to: '/learn/case-studies', label: 'Case Studies' }}
        />
        <h1>{header}</h1>
        <p>{author}</p>
        <p>
          {tags.map(tag => (
            <span key={tag} style={{ marginRight: 5 }}>
              {tag}
            </span>
          ))}
        </p>
        <MarkdownContent source={body} />
      </Style.PageContent>
    </Style.PageContainer>
  );
};

export default CaseStudy;
