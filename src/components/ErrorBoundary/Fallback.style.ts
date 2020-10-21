import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import theme from 'assets/theme';

export const Container = styled.div`
  border: solid 1px ${COLOR_MAP.GRAY.BASE};
  background-color: ${COLOR_MAP.LIGHTGRAY};
  padding: ${theme.spacing(4)}px;

  // Super centered from https://web.dev/one-line-layouts/
  display: grid;
  place-items: center;
`;
