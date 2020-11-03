import styled from 'styled-components';
import theme from 'assets/theme';
import { mobileBreakpoint } from 'assets/theme/sizes';

/*
  Styles that are shared between Learn pages:
*/

export const PageContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 2rem auto;
  min-height: 65vh;

  @media (min-width: ${mobileBreakpoint}) {
    margin: 3.5rem auto;
  }
`;

export const PageContent = styled.main`
  flex: 1 1 0;
  padding: 0 1.25rem;
`;

export const BreadcrumbsContainer = styled.div`
  margin-bottom: ${theme.spacing(2)}px;
`;

export const ButtonContainer = styled.div`
  margin-top: ${theme.spacing(2)}px;
  margin-bottom: ${theme.spacing(3)}px;
`;
