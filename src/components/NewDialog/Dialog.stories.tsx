import React, { useState } from 'react';
import NewDialog from './NewDialog';
import { vulnerabilitiesModal } from 'cms-content/modals';

export default {
  title: 'Below the fold/Vulnerabilities Modal',
  component: NewDialog,
};

export const VulnerabilitiesModal = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = () => setDialogOpen(false);

  const { header, body, links } = vulnerabilitiesModal;

  return (
    <>
      <div onClick={() => setDialogOpen(true)}>Open dialog</div>
      <NewDialog
        open={dialogOpen}
        closeDialog={closeDialog}
        header={header}
        body={body}
        links={links}
      />
    </>
  );
};
