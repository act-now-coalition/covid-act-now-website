import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiIconButton from '@material-ui/core/IconButton';
import theme from 'assets/theme';

const getPadding = (fullScreen: boolean) =>
  fullScreen ? theme.spacing(1) : theme.spacing(3);

export const DialogTitle = styled(MuiDialogTitle)<{ $fullScreen: boolean }>`
  padding: ${({ $fullScreen }) => getPadding($fullScreen)}px;
  padding-left: ${theme.spacing(3)}px;
`;

export const ButtonContainer = styled(Grid).attrs(props => ({
  item: true,
}))`
  text-align: right;
`;

export const StyledPaper = styled(Paper)`
  max-height: 835px;
  height: 95%;
  max-width: 860px;
`;

export const IconButton = styled(MuiIconButton).attrs(props => ({
  disableFocusRipple: true,
  disableRipple: true,
}))`
  &:focus {
    outline: rgb(0, 95, 204) 1px auto;
  }
`;
