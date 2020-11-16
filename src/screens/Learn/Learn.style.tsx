import styled from 'styled-components';
import theme from 'assets/theme';
import { Heading1 } from 'components/Markdown';

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
  margin: 1.5rem 0;
`;
