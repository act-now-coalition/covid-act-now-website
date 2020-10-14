import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import theme from 'assets/theme';

const getPadding = (fullScreen: boolean) =>
  fullScreen ? theme.spacing(1) : theme.spacing(3);

export const DialogTitle = styled(MuiDialogTitle)<{ $fullScreen: boolean }>`
  padding: ${({ $fullScreen }) => getPadding($fullScreen)}px;
`;

export const ButtonContainer = styled(Grid).attrs(props => ({
  justify: 'flex-end',
  item: true,
}))`
  text-align: right;
`;

export const TitleContainer = styled(Grid)<{ $fullScreen: boolean }>`
  padding-left: ${({ $fullScreen }) => ($fullScreen ? theme.spacing(2) : 0)}px;
`;

export const StyledPaper = styled(Paper)`
  max-height: 900px;
  height: 95%;
  max-width: 860px;
`;
