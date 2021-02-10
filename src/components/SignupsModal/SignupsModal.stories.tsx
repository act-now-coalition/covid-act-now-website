import React from 'react';
import SignupsModal from './SignupsModal';

export default {
  title: 'Shared Components/SignupsModal',
  component: SignupsModal,
};

export const Modal = () => {
  return <SignupsModal handleCloseModal={() => {}} />;
};
