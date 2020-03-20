import styled from 'styled-components';
import { colors } from '@material-ui/core';

import palette from 'assets/theme/palette';

export const Wrapper = styled.div`
  background-color: white;
  padding: 0;
  padding: 40px;
`;

export const Content = styled.div`
  max-width: 900px;
  margin: auto;
  h1,
  h5,
  p {
    margin-bottom: 24px;
  }
`;
