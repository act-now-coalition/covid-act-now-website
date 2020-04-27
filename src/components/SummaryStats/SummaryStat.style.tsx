import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core';

export const SummaryStatWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatNameText = styled(Typography)`
  font-weight: bold;
`;

export const StatValueText = styled(Typography)`
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  font-size: 2.2rem;
  font-weight: bold;
  padding: 1rem 0 1.2rem;
`;
