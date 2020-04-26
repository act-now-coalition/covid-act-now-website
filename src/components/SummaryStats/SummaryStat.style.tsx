import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core';

export const SummaryStatWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  align-items: center;
  width: 120px;
  `;

export const StatNameText = styled(Typography)`
    font-weight: 400;

`;

export const StatValueText = styled(Typography)`
    font-weight: 900;
    font-size: 20px;
    margin: 8px;
`;