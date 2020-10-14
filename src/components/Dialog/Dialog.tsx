import React from 'react';
import MuiDialog, {
  DialogProps as MuiDialogProps,
} from '@material-ui/core/Dialog';
import LockBodyScroll from './LockBodyScroll';
import MuiDialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import * as Style from './Dialog.style';
import DialogTitle from './DialogTitle';

type CloseReason = 'backdropClick' | 'escapeKeyDown';

export interface DialogProps extends MuiDialogProps {
  closeDialog: () => void;
  renderHeader?: () => React.ReactElement;
}

const Dialog: React.FC<DialogProps> = props => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { renderHeader, children, onClose, closeDialog, ...otherProps } = props;

  function dismissDialog(event: {}, closeReason: CloseReason) {
    onClose && onClose({}, closeReason);
    closeDialog();
  }

  return (
    <MuiDialog
      onClose={dismissDialog}
      PaperComponent={Style.StyledPaper}
      fullScreen={fullScreen}
      {...otherProps}
    >
      <LockBodyScroll />
      <DialogTitle
        onClickClose={closeDialog}
        renderHeader={renderHeader}
        fullScreen={fullScreen}
      />
      <MuiDialogContent>{children}</MuiDialogContent>
    </MuiDialog>
  );
};

export default Dialog;
