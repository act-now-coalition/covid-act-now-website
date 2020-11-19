import React from 'react';
import {
  StyledLink,
  StyledCard,
  StyledCardContent,
  ArrowIcon,
  CardLogo,
  CopyContainer,
  ReadMoreContainer,
} from './CaseStudyCard.style';
import { CaseStudy } from 'cms-content/learn';
import { MarkdownContent, Heading3, Paragraph } from 'components/Markdown';

const CaseStudyCard = (props: { cardContent: CaseStudy; url: string }) => {
  const { cardContent, url } = props;
  const { shortTitle, summary, caseStudyId } = cardContent;
  return (
    <StyledCard>
      <StyledLink to={`${url}/${caseStudyId}`}>
        <StyledCardContent>
          <CopyContainer>
            <CardLogo src={cardContent.logoUrl} alt={cardContent.logoAltText} />
            <Heading3>{shortTitle}</Heading3>
            <MarkdownContent source={summary} />
          </CopyContainer>
          <ReadMoreContainer>
            <Paragraph>Read the study</Paragraph>
            <ArrowIcon />
          </ReadMoreContainer>
        </StyledCardContent>
      </StyledLink>
    </StyledCard>
  );
};

export default CaseStudyCard;
