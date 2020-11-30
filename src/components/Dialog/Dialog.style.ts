import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiIconButton from '@material-ui/core/IconButton';

export const DialogTitle = styled(MuiDialogTitle)`
  padding: 0 0 1rem;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing(1)}px;
  right: ${({ theme }) => theme.spacing(1)}px;
`;

export const StyledPaper = styled(Paper)`
  @media (min-width: 600px) {
    max-height: 835px;
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
  padding: 0 1rem 2.5rem;

  @media (min-width: 600px) {
    padding: 1rem 1.5rem;
  }
`;
