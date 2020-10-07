import React from 'react';
import MuiDialog, { DialogProps } from '@material-ui/core/Dialog';
import * as Style from './Dialog.style';
import CloseIcon from '@material-ui/icons/Close';

const Dialog: React.FC<DialogProps & { closeDialog: () => void }> = props => {
  const { children, onClose, closeDialog, ...otherProps } = props;
  return (
    <MuiDialog {...otherProps}>
      <Style.Container>
        <Style.Header>
          <CloseIcon onClick={closeDialog} />
        </Style.Header>
        <Style.Body>{children}</Style.Body>
      </Style.Container>
    </MuiDialog>
  );
};

export default Dialog;
