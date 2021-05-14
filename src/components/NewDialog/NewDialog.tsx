import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'cms-content/modals';
import {
  HeaderWrapper,
  Header,
  DialogContent,
  StyledIconButton,
  StyledPaper,
} from './Dialog.style';
import { LargeOutlinedButton } from 'components/ButtonSystem';
import { MarkdownBody } from 'components/Markdown';
import { LockBodyScroll } from 'components/Dialog';

const NewDialog: React.FC<{
  open: boolean;
  closeDialog: () => void;
  header: string;
  body: string;
  links: Link[];
}> = ({ open, closeDialog, header, body, links }) => {
  return (
    <Dialog
      open={open}
      PaperComponent={StyledPaper}
      onEscapeKeyDown={closeDialog}
      onBackdropClick={closeDialog}
    >
      <LockBodyScroll />
      <HeaderWrapper>
        <Header>{header}</Header>
        <StyledIconButton aria-label="close" onClick={closeDialog}>
          <CloseIcon />
        </StyledIconButton>
      </HeaderWrapper>
      <DialogContent>
        <MarkdownBody source={body} />
        {links.length && (
          <>
            {links.map((link: Link) => (
              <LargeOutlinedButton to={link.url} key={link.cta}>
                {link.cta}
              </LargeOutlinedButton>
            ))}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewDialog;
