import React from 'react';
import { FixedButton } from './ScrollToTopButton.style';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

const ScrollToTopButton = (props: {
  showButton: boolean;
  analyticsCategory: EventCategory;
}) => {
  const { showButton, analyticsCategory } = props;

  const onClickHandler = () => {
    trackEvent(analyticsCategory, EventAction.CLICK, 'Scroll to top button');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <FixedButton showButton={showButton} onClick={onClickHandler}>
      Back to top
    </FixedButton>
  );
};

export default ScrollToTopButton;
