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
  padding: 48px;
  margin: 0;
  h2 {
    margin-bottom: 18px;
    font-weight: 500;
    font-size: 32px;
    line-height: 56px;
  }

  @media(min-width: 600px) {
    h2 {
      margin-bottom: 24px;
      font-size: 48px;
    }
  }

  p {
    line-height: 24px;
  }
`;

export const RedBar = styled.div`
  background-color: ${palette.secondary.main};
  margin: 0;
  min-height: 32px;
  padding: 5px;
  height: auto;
  display: flex;
  align-items: center;
`;
