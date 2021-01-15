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
  url: string;
  logoUrl?: string;
  logoAltText?: string;
  borderTop?: boolean;
}> = ({ id, title, summary, logoUrl, logoAltText, borderTop, url }) => {
  return (
    <StyledLink to={`${url}/${id}`} aria-label={title}>
      <StyledCard borderTop={borderTop}>
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
      </StyledCard>
    </StyledLink>
  );
};

export default LandingPageCard;
