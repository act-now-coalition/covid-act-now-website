import React, { useState, useRef } from 'react';
import {
  Container,
  Checkbox,
  CopyContainer,
  CheckboxWrapper,
} from './IndigenousDataCheckbox.style';
import LearnMoreModal from './LearnMoreModal';
import { CenteredContentModal } from 'components/Compare/Compare.style';
import ExternalLink from 'components/ExternalLink';
import StatTag from 'components/SummaryStats/StatTag';

const IndigenousDataCheckbox = (props: {
  chartIndigenous?: boolean;
  setChartIndigenous?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { chartIndigenous, setChartIndigenous } = props;
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setChartIndigenous && setChartIndigenous(true);
    scrollToCheckbox();
  };

  const checkboxRef = useRef<HTMLDivElement>(null);

  const scrollToCheckbox = () => {
    return setTimeout(() => {
      if (checkboxRef.current) {
        window.scrollTo({
          left: 0,
          top: checkboxRef.current.offsetTop - 75,
          behavior: 'smooth',
        });
      }
    }, 250);
  };

  const onClickChartIndigenous = () => {
    if (setChartIndigenous) {
      const newChartIndigenous = !chartIndigenous;
      setChartIndigenous(newChartIndigenous);
    }
  };

  // TODO (Chelsi): add link to blog post
  return (
    <Container ref={checkboxRef}>
      <CheckboxWrapper>
        <Checkbox
          disableRipple
          checked={chartIndigenous}
          onChange={onClickChartIndigenous}
          name="Chart Indigenous Populations"
          id="Chart Indigenous Populations"
        />
      </CheckboxWrapper>
      <CopyContainer>
        <strong>
          View COVID’s impact on counties with majority Native American
          populations <StatTag featured />
        </strong>
        <br />
        Created on Indigenous Peoples’ Day, this feature allows you to compare
        all counties that are “Native American majority counties“ (NAMC) to the
        entire USA for two metrics: Cases and Deaths. Learn more about{' '}
        <span onClick={() => setShowModal(true)}>our methodology</span> or view{' '}
        <ExternalLink href="https://blog.covidactnow.org/covid-native-american-counties/">
          our observations
        </ExternalLink>
        .
      </CopyContainer>
      <CenteredContentModal open={showModal} onClose={handleCloseModal}>
        <LearnMoreModal onClose={handleCloseModal} />
      </CenteredContentModal>
    </Container>
  );
};

export default IndigenousDataCheckbox;
