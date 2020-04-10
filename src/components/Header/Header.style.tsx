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

export const HeaderTitle = styled(Typography)<{ component?: string }>`
  color: white;
  font-size: 2em;
  font-weight: 700;
  line-height: 2rem;
`;

export const HeaderRule = styled(Typography)<{ component?: string }>`
  width: 100px;
  height: 1px;
  background: #ffffff;
  opacity: 0.4;
  margin: 2.25rem 0 2rem;
`;

export const HeaderSubCopy = styled(Typography)<{ component?: string }>`
  font-size: 1rem;
  font-weight: 600;

  @media (min-width: 1280px) {
    text-align: right;
    font-size: 1rem;
  }
`;

export const BlackBar = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  color: ${colors.grey[50]};
  padding: 2rem 1rem;
  margin: 0;

  @media (min-width: 1280px) {
    align-items: center;
    padding: 1.5rem 2rem;
    flex-direction: row;
  }
`;

export const RedBar = styled.div`
  background-color: ${palette.secondary.main};
  margin: 0;
  padding: 0.8rem;
  height: auto;
  display: flex;
  align-items: center;
`;
