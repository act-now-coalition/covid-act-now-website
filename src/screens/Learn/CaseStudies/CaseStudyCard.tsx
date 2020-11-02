import React from 'react';
import {
  StyledLink,
  StyledCard,
  StyledCardContent,
  CardTitle,
  CardHalf,
  ArrowIcon,
} from './CaseStudy.style';
import { CaseStudy } from 'cms-content/learn';

// replace <p> with markdown bodycopy component (will color text properly)
// pull in logo
const CaseStudyCard = (props: { cardContent: CaseStudy; url: string }) => {
  const { cardContent, url } = props;
  const { shortTitle, summary, caseStudyId } = cardContent;
  return (
    <StyledCard>
      <StyledLink to={`${url}/${caseStudyId}`}>
        <StyledCardContent>
          <CardHalf>
            <CardTitle>{shortTitle}</CardTitle>
            <p>{summary}</p>
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
