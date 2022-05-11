import React, { useState } from 'react';
import DialogMain from './DialogMain';
import { vulnerabilitiesModal } from 'cms-content/modals';
import { MarkdownBody } from 'components/Markdown';

export default {
  title: 'Location Page/Vulnerabilities Modal',
  component: DialogMain,
};

export const VulnerabilitiesModal = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = () => setDialogOpen(false);

  const { header, body, links } = vulnerabilitiesModal;

  return (
    <>
      <div onClick={() => setDialogOpen(true)}>Open dialog</div>
      <DialogMain
        open={dialogOpen}
        closeDialog={closeDialog}
        header={header}
        links={links}
      >
        <MarkdownBody source={body} />
      </DialogMain>
    </>
  );
};
