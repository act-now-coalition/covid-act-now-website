import React, { useState } from 'react';
import ShareButton from 'components/NewLocationPage/ShareButton/ShareButton';
import {
  Footer,
  ButtonContainer,
  LegendContainer,
  LegendContent,
  FooterText,
  AboutText,
  IconWrapper,
  ModalButton,
} from './ChartFooter.style';
import { useBreakpoint } from 'common/hooks';
import ExternalLink from 'components/ExternalLink/ExternalLink';
import NewDialog from 'components/NewDialog/NewDialog';
import MetricChartFooter from './MetricChartFooter';
import regions from 'common/regions';
import { summaryToStats } from 'components/NewLocationPage/SummaryStat/utils';
import { useSummaries } from 'common/location_summaries';
import { Metric } from 'common/metricEnum';

export default {
  title: 'Location page redesign/Chart Footer',
};

const footerText =
  'Over the last week, Texas has averaged 3,173 new confirmed cases per day (10.9 for every 100,000 residents).';

const legendIcon = (
  <svg
    width="8"
    height="9"
    viewBox="0 0 8 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="0.152344" width="8" height="8" fill="#E0E0E0" />
  </svg>
);

export const ChartFooterButtonOnly = () => {
  return (
    <Footer>
      <ButtonContainer>
        <ShareButton onClickShare={() => {}} />
      </ButtonContainer>
    </Footer>
  );
};

export const ChartFooterWithSourceText = () => {
  return (
    <Footer>
      Source:&nbsp;
      <ExternalLink href="https://www.cdc.gov/" style={{ color: 'inherit' }}>
        CDC
      </ExternalLink>
      <ButtonContainer>
        <ShareButton onClickShare={() => {}} />
      </ButtonContainer>
    </Footer>
  );
};

export const ChartFooterWithAboutText = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Footer>
      <ModalButton onClick={() => setOpenModal(true)}>
        <AboutText>About this data</AboutText>
      </ModalButton>
      <NewDialog
        open={openModal}
        closeDialog={() => setOpenModal(false)}
        header="Header text"
        body="Body text"
        links={[]}
      />
      <ButtonContainer>
        <ShareButton onClickShare={() => {}} />
      </ButtonContainer>
    </Footer>
  );
};

export const ChartFooterWithLegend = () => {
  return (
    <Footer>
      <LegendContainer>
        <LegendContent>
          <IconWrapper>{legendIcon}</IconWrapper>
          Legend Copy
        </LegendContent>
        <LegendContent>
          <IconWrapper>{legendIcon}</IconWrapper>
          Copy to explain bars. This copy may be long.
        </LegendContent>
      </LegendContainer>
      <ButtonContainer>
        <ShareButton onClickShare={() => {}} />
      </ButtonContainer>
    </Footer>
  );
};

export const ChartFooterWithTextAndAboutSection = () => {
  const isMobile = useBreakpoint(600);
  return (
    <>
      <Footer>
        <FooterText>
          {footerText}&nbsp;
          {!isMobile && <AboutText>About this data</AboutText>}
        </FooterText>
        {!isMobile && (
          <ButtonContainer>
            <ShareButton onClickShare={() => {}} />
          </ButtonContainer>
        )}
      </Footer>
      {isMobile && (
        <Footer>
          <AboutText>About this data</AboutText>
          <ButtonContainer>
            <ShareButton onClickShare={() => {}} />
          </ButtonContainer>
        </Footer>
      )}
    </>
  );
};

export const MetricChartFooterExample = () => {
  const footerText =
    'Over the last week, Texas has averaged 3,173 new confirmed cases per day (10.9 for every 100,000 residents).';
  const header = 'This is the modal header.';
  const body = 'This is the modal body.';
  const links = [{ cta: 'Learn more', url: '/' }];
  const region = regions.findByFipsCodeStrict('48');
  const locationSummary = useSummaries()?.[48];
  if (!locationSummary) {
    return null;
  }
  const stats = summaryToStats(locationSummary);
  return (
    <MetricChartFooter
      footerText={footerText}
      shareButtonProps={{
        region: region,
        stats: stats,
        chartIdentifier: Metric.CASE_DENSITY,
        showEmbedButton: false,
      }}
      aboutModal={{ header: header, body: body, links: links }}
    />
  );
};
