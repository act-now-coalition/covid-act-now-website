import React from 'react';
import { FixedButton } from './ScrollToTopButton.style';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const ScrollToTopButton = (props: {
  showButton: boolean;
  analyticsCategory: EventCategory;
}) => {
  const { showButton, analyticsCategory } = props;

  const onClickHandler = () => {
    trackEvent(analyticsCategory, EventAction.CLICK, 'Scroll to top');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <FixedButton showButton={showButton} onClick={onClickHandler}>
      <ArrowUpwardIcon />
      <span>Back to top</span>
    </FixedButton>
  );
};

export default ScrollToTopButton;
