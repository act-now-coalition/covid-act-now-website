import React from 'react';
import {
  StyledLink,
  StyledCard,
  StyledCardContent,
  CardTitle,
  ArrowIcon,
  CardLogo,
  CardBody,
  CopyContainer,
  IconContainer,
} from './CaseStudy.style';
import { CaseStudy } from 'cms-content/learn';

const CaseStudyCard = (props: { cardContent: CaseStudy; url: string }) => {
  const { cardContent, url } = props;
  const { shortTitle, summary, caseStudyId } = cardContent;
  return (
    <StyledCard>
      <StyledLink to={`${url}/${caseStudyId}`}>
        <StyledCardContent>
          <CopyContainer>
            <CardLogo src={cardContent.logoUrl} alt={cardContent.logoAltText} />
            <CardTitle>{shortTitle}</CardTitle>
            <CardBody source={summary} />
          </CopyContainer>
          <IconContainer>
            <ArrowIcon />
          </IconContainer>
        </StyledCardContent>
      </StyledLink>
    </StyledCard>
  );
};

export default CaseStudyCard;
