import React from 'react';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Hidden from '@material-ui/core/Hidden';
import { DialogTitleProps as MuiDialogTitleProps } from '@material-ui/core/DialogTitle';
import * as Style from './Dialog.style';

export interface DialogTitleProps extends MuiDialogTitleProps {
  renderHeader?: () => React.ReactElement;
  onClickClose: () => void;
}

const ButtonCloseBox: React.FC<{ onClickClose: () => void }> = ({
  onClickClose,
}) => (
  <Style.ButtonContainer sm={2} xs={12}>
    <Style.IconButton aria-label="close" onClick={onClickClose} size="small">
      <CloseIcon />
    </Style.IconButton>
  </Style.ButtonContainer>
);

const DialogTitle: React.FC<DialogTitleProps> = props => {
  const { onClickClose, renderHeader, ...otherProps } = props;
  return (
    <Style.DialogTitle disableTypography {...otherProps}>
      <Grid container spacing={1}>
        <Hidden key="close-button-mobile" smUp>
          <ButtonCloseBox onClickClose={onClickClose} />
        </Hidden>
        {renderHeader && (
          <Grid key="header-content" item sm={10} xs={12}>
            {renderHeader()}
          </Grid>
        )}
        <Hidden key="close-button-desktop" xsDown>
          <ButtonCloseBox onClickClose={onClickClose} />
        </Hidden>
      </Grid>
    </Style.DialogTitle>
  );
};

export default DialogTitle;
