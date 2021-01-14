import React from 'react';
import {
  StyledLink,
  StyledCard,
  StyledCardContent,
  ArrowIcon,
  CardLogo,
  CopyContainer,
} from 'screens/Learn/Learn.style';
import { MarkdownContent, Heading3 } from 'components/Markdown';

const LandingPageCard: React.FC<{
  id: string;
  title: string;
  summary: string;
  logoUrl?: string;
  logoAltText?: string;
  borderTop?: boolean;
}> = ({ id, title, summary, logoUrl, logoAltText, borderTop }) => {
  return (
    <StyledCard borderTop={borderTop}>
      <StyledLink to={`/covid-explained/${id}`}>
        <StyledCardContent>
          <CopyContainer>
            {logoUrl && logoAltText && (
              <CardLogo src={logoUrl} alt={logoAltText} />
            )}
            <Heading3>{title}</Heading3>
            <MarkdownContent source={summary} />
          </CopyContainer>
          <ArrowIcon />
        </StyledCardContent>
      </StyledLink>
    </StyledCard>
  );
};

export default LandingPageCard;
