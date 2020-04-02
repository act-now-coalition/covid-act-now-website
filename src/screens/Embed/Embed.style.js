import styled, { createGlobalStyle } from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { COLORS } from 'enums';

export const EmbedGlobalStyle = createGlobalStyle`
  body {
    background: none transparent;
  }
`;

export const EmbedHeaderContainer = styled(Box)`
  background-color: ${COLORS.LIGHTGRAY};
`;

export const EmbedContainer = styled(Paper)`
  margin: 3px;
  overflow: hidden;
`;

export const EmbedContentContainer = styled(Box)`
  padding: 0 8px;
`;
