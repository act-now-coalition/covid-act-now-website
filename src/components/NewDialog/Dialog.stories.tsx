import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import NewDialog from './NewDialog';

export default {
  title: 'Below the fold/Dialog',
  component: NewDialog,
};

export const Example = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = () => setDialogOpen(false);

  return (
    <>
      <div onClick={() => setDialogOpen(true)}>Open dialog</div>
      <Dialog open={dialogOpen}>
        <NewDialog closeDialog={closeDialog} />
      </Dialog>
    </>
  );
};
