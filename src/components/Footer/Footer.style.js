import styled from 'styled-components';
import { colors } from '@material-ui/core';

import palette from 'assets/theme/palette';

export const Wrapper = styled.div`
  background-color: white;
  padding: 0;
  margin: 40px 0 0;
  padding: 40px;
`;

export const Content = styled.div`
  max-width: 900px;
  margin: auto;
  h5,
  h6,
  p {
    margin-bottom: 24px;
  }
  h5 {
    font-weight: 600;
  }
  p {
    color: ${colors.grey[700]};
  }
`;
