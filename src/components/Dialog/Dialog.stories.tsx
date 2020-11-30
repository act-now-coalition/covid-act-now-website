import React from 'react';
import Dialog, { useDialog } from '.';

export default {
  title: 'Building Blocks/Dialog',
  container: Dialog,
};

export const renderTitle = () => <h1>Title</h1>;

export const Default = () => {
  const [isOpen, openDialog, closeDialog] = useDialog(false);
  return (
    <div>
      <button onClick={openDialog}>open</button>
      <Dialog
        open={isOpen}
        closeDialog={closeDialog}
        renderHeader={renderTitle}
        fullWidth
        maxWidth="md"
      >
        Our goal is to provide you with clear, trusted information so that you
        can make informed decisions and help stop the pandemic.
      </Dialog>
    </div>
  );
};
