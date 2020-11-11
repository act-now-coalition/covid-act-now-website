import styled from 'styled-components';
import theme from 'assets/theme';

export const Placeholder = styled.div`
  padding: ${theme.spacing(2)}px;
`;

export const PageContent = styled.main`
  margin: 0 ${theme.spacing(2)}px;
  margin-bottom: ${theme.spacing(4)}px;

  @media (min-width: ${960}px) {
    max-width: ${960}px;
    margin: 0 auto;
    margin-bottom: ${theme.spacing(4)}px;
  }
`;
