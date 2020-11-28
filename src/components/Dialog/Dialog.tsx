import React from 'react';
import MuiDialog, {
  DialogProps as MuiDialogProps,
} from '@material-ui/core/Dialog';
import LockBodyScroll from './LockBodyScroll';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import * as Style from './Dialog.style';
import DialogTitle from './DialogTitle';
import { DialogTitleProps as MuiDialogTitleProps } from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

type CloseReason = 'backdropClick' | 'escapeKeyDown';

export interface DialogProps extends MuiDialogProps {
  closeDialog: () => void;
  renderHeader?: () => React.ReactElement;
}

export interface DialogTitleProps extends MuiDialogTitleProps {
  renderHeader?: () => React.ReactElement;
  onClickClose: () => void;
}

const ButtonCloseBox: React.FC<{ onClickClose: () => void }> = ({
  onClickClose,
}) => (
  <Style.ButtonContainer>
    <Style.IconButton aria-label="close" onClick={onClickClose} size="small">
      <CloseIcon />
    </Style.IconButton>
  </Style.ButtonContainer>
);

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
      aria-labelledby="dialog-title"
      disableScrollLock={false}
      {...otherProps}
    >
      <LockBodyScroll />
      <ButtonCloseBox onClickClose={closeDialog} />
      <Style.StyledMuiDialogContent>
        <DialogTitle
          id="dialog-title"
          onClickClose={closeDialog}
          renderHeader={renderHeader}
          tabIndex={-1}
        />
        {children}
      </Style.StyledMuiDialogContent>
    </MuiDialog>
  );
};

export default Dialog;
