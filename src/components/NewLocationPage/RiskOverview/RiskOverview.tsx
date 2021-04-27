import React from 'react';
import {
  Item,
  Section,
  MultiStatsWrapper,
  Wrapper,
} from './RiskOverview.style';
import { Region } from 'common/regions';
import { LocationSummary } from 'common/location_summaries';
import { summaryToStats } from '../SummaryStatsBlock/utils';

const RiskOverview: React.FC<{
  region: Region;
  locationSummary: LocationSummary;
}> = ({ region, locationSummary }) => {
  const stats = summaryToStats(locationSummary);

  return (
    <Wrapper>
      <Section style={{ flex: 3 }}>
        <Item>Overall</Item>
        <MultiStatsWrapper>
          <Item style={{ flex: 1 }}>Stat: DNC</Item>
          <Item style={{ flex: 1 }}>Stat: Rt</Item>
          <Item style={{ flex: 1 }}>Stat: Pos rate</Item>
        </MultiStatsWrapper>
      </Section>
      <Section style={{ flex: 2 }}>
        <Item>Vax progress bar</Item>
        <Item>Stat: Vax</Item>
      </Section>
    </Wrapper>
  );
};

export default RiskOverview;
