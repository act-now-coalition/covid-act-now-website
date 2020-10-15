import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiIconButton from '@material-ui/core/IconButton';

export const DialogTitle = styled(MuiDialogTitle)`
  padding: 1rem 1rem 1rem 1.5rem;
`;

export const ButtonContainer = styled(Grid).attrs(props => ({
  item: true,
}))`
  text-align: right;
`;

export const StyledPaper = styled(Paper)`
  @media (min-width: 600px) {
    max-height: 835px;
    height: 95%;
    max-width: 860px;
    width: 95%;
  }
`;

export const IconButton = styled(MuiIconButton).attrs(props => ({
  disableFocusRipple: true,
  disableRipple: true,
}))`
  &:focus {
    outline: rgb(0, 95, 204) 1px auto;
  }
`;

export const StyledMuiDialogContent = styled(MuiDialogContent)`
  padding: 0.5rem 1rem 2.5rem;

  @media (min-width: 600px) {
    padding: 0.5rem 1.5rem;
  }
`;
