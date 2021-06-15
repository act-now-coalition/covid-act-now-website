import React from 'react';
import upperFirst from 'lodash/upperFirst';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'cms-content/modals';
import {
  HeaderWrapper,
  Header,
  DialogContent,
  StyledIconButton,
  StyledPaper,
  LinksContainer,
} from './Dialog.style';
import { LargeOutlinedButton } from 'components/ButtonSystem';
import { LockBodyScroll } from 'components/Dialogs';

const DialogMain: React.FC<{
  open: boolean;
  closeDialog: () => void;
  header: string;
  links: Link[];
}> = ({ open, closeDialog, header, links, children }) => {
  return (
    <Dialog
      open={open}
      PaperComponent={StyledPaper}
      onEscapeKeyDown={closeDialog}
      onBackdropClick={closeDialog}
    >
      <LockBodyScroll />
      <HeaderWrapper>
        <Header>{upperFirst(header)}</Header>
        <StyledIconButton aria-label="close" onClick={closeDialog}>
          <CloseIcon />
        </StyledIconButton>
      </HeaderWrapper>
      <DialogContent>
        {children}
        <LinksContainer>
          {links.length && (
            <>
              {links.map((link: Link) => (
                <LargeOutlinedButton to={link.url} key={link.cta}>
                  {link.cta}
                </LargeOutlinedButton>
              ))}
            </>
          )}
        </LinksContainer>
      </DialogContent>
    </Dialog>
  );
};

export default DialogMain;
