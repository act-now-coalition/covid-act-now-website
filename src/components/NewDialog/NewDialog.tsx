import React from 'react';
import {
  HeaderWrapper,
  Header,
  DialogContent,
  StyledIconButton,
  StyledPaper,
} from './Dialog.style';
import CloseIcon from '@material-ui/icons/Close';
import { LargeOutlinedButton } from 'components/ButtonSystem';
import { MarkdownBody } from 'components/Markdown';
import { Link } from 'cms-content/modals';
import Dialog from '@material-ui/core/Dialog';

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
