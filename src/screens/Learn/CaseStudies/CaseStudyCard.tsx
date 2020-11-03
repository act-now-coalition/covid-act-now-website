import React from 'react';
import {
  StyledLink,
  StyledCard,
  StyledCardContent,
  CardTitle,
  CardHalf,
  ArrowIcon,
  CardLogo,
  CardBody,
} from './CaseStudy.style';
import { CaseStudy } from 'cms-content/learn';

const CaseStudyCard = (props: { cardContent: CaseStudy; url: string }) => {
  const { cardContent, url } = props;
  const { shortTitle, summary, caseStudyId } = cardContent;
  return (
    <StyledCard>
      <StyledLink to={`${url}/${caseStudyId}`}>
        <StyledCardContent>
          <CardHalf>
            <CardLogo src={cardContent.logoUrl} alt={cardContent.logoAltText} />
            <CardTitle>{shortTitle}</CardTitle>
            <CardBody source={summary} />
          </CardHalf>
          <CardHalf>
            <ArrowIcon />
          </CardHalf>
        </StyledCardContent>
      </StyledLink>
    </StyledCard>
  );
};

export default CaseStudyCard;
