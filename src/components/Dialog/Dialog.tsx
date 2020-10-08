import React from 'react';
import MuiDialog, { DialogProps } from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LockBodyScroll from './LockBodyScroll';
import * as Style from './Dialog.style';

type CloseReason = 'backdropClick' | 'escapeKeyDown';

const Dialog: React.FC<DialogProps & { closeDialog: () => void }> = props => {
  const { children, onClose, closeDialog, ...otherProps } = props;

  function dismissDialog(event: {}, closeReason: CloseReason) {
    onClose && onClose({}, closeReason);
    closeDialog();
  }

  return (
    <MuiDialog onClose={dismissDialog} {...otherProps}>
      <LockBodyScroll />
      <Style.Container>
        <Style.Header>
          <IconButton
            aria-label="close"
            onClick={closeDialog}
            disableFocusRipple
            disableRipple
          >
            <CloseIcon />
          </IconButton>
        </Style.Header>
        <Style.Body>{children}</Style.Body>
      </Style.Container>
    </MuiDialog>
  );
};

export default Dialog;
