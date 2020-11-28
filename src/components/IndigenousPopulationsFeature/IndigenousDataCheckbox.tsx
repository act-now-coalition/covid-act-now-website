import React, { useState, useRef } from 'react';
import {
  Container,
  Checkbox,
  CopyContainer,
  CheckboxWrapper,
} from './IndigenousDataCheckbox.style';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { Link } from 'react-router-dom';
import Dialog, { useDialog } from 'components/Dialog';
import { LearnMoreContent, LearnMoreTitle } from './LearnMoreModal';

const IndigenousDataCheckbox = (props: {
  chartIndigenous?: boolean;
  setChartIndigenous?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { chartIndigenous, setChartIndigenous } = props;
  const [isOpen, openDialog, closeDialog] = useDialog(false);

  const handleCloseModal = () => {
    closeDialog();
    setChartIndigenous && setChartIndigenous(true);
    scrollToCheckbox();
  };

  const checkboxRef = useRef<HTMLDivElement>(null);

  const scrollToCheckbox = () => {
    return setTimeout(() => {
      if (checkboxRef.current) {
        window.scrollTo({
          left: 0,
          top: checkboxRef.current.offsetTop - 800,
          behavior: 'smooth',
        });
      }
    }, 250);
  };

  const onClickChartIndigenous = () => {
    if (setChartIndigenous) {
      const newChartIndigenous = !chartIndigenous;
      setChartIndigenous(newChartIndigenous);
      trackEvent(
        EventCategory.INDIGENOUS_PEOPLES_DAY,
        EventAction.SELECT,
        `Select Native American Counties`,
        newChartIndigenous ? 1 : 0,
      );
    }
  };

  const onClickMethodology = () => {
    openDialog();
    trackEvent(
      EventCategory.INDIGENOUS_PEOPLES_DAY,
      EventAction.OPEN_MODAL,
      'Methodology',
    );
  };

  return (
    <Container ref={checkboxRef}>
      <CheckboxWrapper>
        <Checkbox
          disableRipple
          checked={chartIndigenous}
          onChange={onClickChartIndigenous}
          name="Chart Indigenous Populations"
          id="Chart Indigenous Populations"
          aria-labelledby="native-american-populations-label"
        />
      </CheckboxWrapper>
      <CopyContainer>
        <label id="native-american-populations-label">
          <strong>
            View COVID’s impact on counties with majority Native American
            populations.
          </strong>{' '}
        </label>
        Learn more about{' '}
        <span onClick={onClickMethodology}>our methodology</span> or view{' '}
        <Link to="/deep-dives/covid-spread-native-american">
          our observations
        </Link>
        .
      </CopyContainer>
      <Dialog
        open={isOpen}
        closeDialog={handleCloseModal}
        renderHeader={() => <LearnMoreTitle />}
      >
        <LearnMoreContent closeDialog={handleCloseModal} />
      </Dialog>
    </Container>
  );
};

export default IndigenousDataCheckbox;
