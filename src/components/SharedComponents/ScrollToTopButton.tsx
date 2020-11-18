import React from 'react';
import { FixedButton } from './ScrollToTopButton.style';

const ScrollToTopButton = (props: { showButton: boolean }) => {
  const { showButton } = props;

  const onClickHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <FixedButton showButton={showButton} onClick={onClickHandler}>
      Back to top
    </FixedButton>
  );
};

export default ScrollToTopButton;
