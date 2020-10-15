import React from 'react';
import Grid from '@material-ui/core/Grid';
import { DialogTitleProps as MuiDialogTitleProps } from '@material-ui/core/DialogTitle';
import * as Style from './Dialog.style';

export interface DialogTitleProps extends MuiDialogTitleProps {
  renderHeader?: () => React.ReactElement;
  onClickClose: () => void;
}

const DialogTitle: React.FC<DialogTitleProps> = props => {
  const { onClickClose, renderHeader, ...otherProps } = props;
  return (
    <Style.DialogTitle disableTypography {...otherProps}>
      <Grid container spacing={1}>
        {renderHeader && (
          <Grid key="header-content" item sm={10} xs={12}>
            {renderHeader()}
          </Grid>
        )}
      </Grid>
    </Style.DialogTitle>
  );
};

export default DialogTitle;
