import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Hidden from '@material-ui/core/Hidden';
import { DialogTitleProps as MuiDialogTitleProps } from '@material-ui/core/DialogTitle';
import * as Style from './Dialog.style';

export interface DialogTitleProps extends MuiDialogTitleProps {
  renderHeader?: () => React.ReactElement;
  onClickClose: () => void;
  fullScreen: boolean;
}

const ButtonCloseBox: React.FC<{ onClickClose: () => void }> = ({
  onClickClose,
}) => (
  <Style.ButtonContainer sm={2} xs={12}>
    <IconButton
      aria-label="close"
      onClick={onClickClose}
      disableFocusRipple
      disableRipple
    >
      <CloseIcon />
    </IconButton>
  </Style.ButtonContainer>
);

const DialogTitle: React.FC<DialogTitleProps> = props => {
  const { onClickClose, renderHeader, fullScreen, ...otherProps } = props;
  return (
    <Style.DialogTitle
      disableTypography
      $fullScreen={fullScreen}
      {...otherProps}
    >
      <Grid container spacing={1}>
        <Hidden key="close-button-mobile" smUp>
          <ButtonCloseBox onClickClose={onClickClose} />
        </Hidden>
        {renderHeader && (
          <Style.TitleContainer
            key="header-content"
            $fullScreen={fullScreen}
            item
            sm={10}
            xs={12}
          >
            {renderHeader()}
          </Style.TitleContainer>
        )}
        <Hidden key="close-button-desktop" xsDown>
          <ButtonCloseBox onClickClose={onClickClose} />
        </Hidden>
      </Grid>
    </Style.DialogTitle>
  );
};

export default DialogTitle;
