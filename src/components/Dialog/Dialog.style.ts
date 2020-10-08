import styled from 'styled-components';
import theme from 'assets/theme';
import { Paper } from '@material-ui/core';

export const Container = styled.div`
  padding: ${theme.spacing(3)}px;
`;

export const Header = styled.div`
  min-height: 30px;
  display: flex;
  justify-content: flex-end;
`;

export const Body = styled.div``;

export const StyledPaper = styled(Paper)`
  max-height: 900px;
  height: 95%;
  max-width: 860px;
`;
