import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import theme from 'assets/theme';

export const Placeholder = styled.div`
  padding: ${theme.spacing(2)}px;
  background-color: ${COLOR_MAP.LIGHTGRAY_BG};
  border: solid 1px ${COLOR_MAP.LIGHTGRAY};
  display: grid;
  place-items: center;
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
