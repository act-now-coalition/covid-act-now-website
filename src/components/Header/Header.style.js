import styled from 'styled-components';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import palette from 'assets/theme/palette';

export const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  color: ${colors.grey[50]};
`;

export const HeaderSubCopy = styled(Typography)`
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1.5em;
  margin-top: ${props => props.mt};
`;

export const BlackBar = styled(Box)`
  background-color: ${colors.grey[900]};
  color: ${colors.grey[50]};
  padding: 1rem 1rem;
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
