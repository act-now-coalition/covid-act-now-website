import styled from 'styled-components';
import { colors } from '@material-ui/core';

import palette from 'assets/theme/palette';

export const Wrapper = styled.div`
  padding: 1rem 2rem 2rem;

  '@media (min-width:600px)': {
    padding: '3rem',
  },
`;

export const Content = styled.div`
  max-width: 900px;
  margin: auto;
`;
