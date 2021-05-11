import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle } from './Dialog.style';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { LargeOutlinedButton } from 'components/ButtonSystem';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { MarkdownBody } from 'components/Markdown';

const NewDialog: React.FC<{ closeDialog: () => void }> = ({ closeDialog }) => {
  return (
    <>
      <DialogTitle>
        Title
        <IconButton aria-label="close" onClick={closeDialog}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <MuiDialogContent>
        <MarkdownBody source="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores ut eum sit, repellendus amet doloribus! Rerum sed atque repudiandae doloribus ut quod, libero adipisci provident magnam tempora temporibus ipsam ratione vitae aut odio magni fugiat eveniet eaque quae consequuntur eum modi! Quibusdam assumenda corporis facere ipsum illum cumque non deserunt?" />
      </MuiDialogContent>
      <MuiDialogActions>
        <LargeOutlinedButton to="/">Learn more</LargeOutlinedButton>
      </MuiDialogActions>
    </>
  );
};

export default NewDialog;
