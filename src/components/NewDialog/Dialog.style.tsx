import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

export const DialogTitle = styled(MuiDialogTitle)`
  ${props => props.theme.fonts.regularBookBold};
  padding: 0 0 1rem;
`;
