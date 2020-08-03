import React, { Fragment, useState } from 'react';
import { Modal } from '@material-ui/core';
import * as Styles from './ImageModal.style';

const ImageModal: React.FunctionComponent = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <Styles.ImageContainer onClick={() => setIsOpen(true)}>
        {children}
      </Styles.ImageContainer>
      <Modal
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Styles.ModalContainer>{children}</Styles.ModalContainer>
      </Modal>
    </Fragment>
  );
};

export default ImageModal;
