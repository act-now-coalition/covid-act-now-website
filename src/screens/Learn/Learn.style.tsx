import styled from 'styled-components';
import theme from 'assets/theme';
import { Heading1 } from 'components/Markdown';
import { materialSMBreakpoint } from 'assets/theme/sizes';

/**
 * Styles that are shared between Learn pages
 */
export const BreadcrumbsContainer = styled.div`
  margin-bottom: ${theme.spacing(2)}px;
`;

export const ButtonContainer = styled.div`
  margin-top: ${theme.spacing(2)}px;
  margin-bottom: ${theme.spacing(6)}px;
`;

export const LearnHeading1 = styled(Heading1)`
  margin: 0 0 1.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 1.5rem 0;
  }
`;
