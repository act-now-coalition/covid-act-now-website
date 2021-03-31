import React from 'react';
import {
  StyledLink,
  StyledCard,
  StyledCardContent,
  CardLogo,
  CopyContainer,
  ReadMoreContainer,
} from './CaseStudyCard.style';
import { CaseStudy } from 'cms-content/learn';
import { MarkdownContent, Heading3 } from 'components/Markdown';
import { TextButton } from 'components/ButtonSystem';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const CaseStudyCard = (props: { cardContent: CaseStudy; url: string }) => {
  const { cardContent, url } = props;
  const { shortTitle, summary, caseStudyId } = cardContent;
  return (
    <StyledLink to={`${url}/${caseStudyId}`} aria-label={shortTitle}>
      <StyledCard>
        <StyledCardContent>
          <CopyContainer>
            <CardLogo src={cardContent.logoUrl} alt={cardContent.logoAltText} />
            <Heading3>{shortTitle}</Heading3>
            <MarkdownContent source={summary} />
          </CopyContainer>
          <ReadMoreContainer>
            <TextButton endIcon={<ArrowForwardIcon />}>Learn how</TextButton>
          </ReadMoreContainer>
        </StyledCardContent>
      </StyledCard>
    </StyledLink>
  );
};

export default CaseStudyCard;
