import styled from 'styled-components';
import { colors } from '@material-ui/core';

import palette from 'assets/theme/palette';

export const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  color: ${colors.grey[50]};
`;

export const Content = styled.div`
  max-width: 900px;
  margin: auto;
`;

export const BlackBar = styled.div`
  background-color: ${colors.grey[900]};
  padding: 4rem 2rem;
  margin: 0;
`;

export const RedBar = styled.div`
  background-color: ${palette.secondary.main};
  margin: 0;
  padding: 0.8rem;
  height: auto;
  display: flex;
  align-items: center;
`;
