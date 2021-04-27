import React from 'react';
import {
  Item,
  Wrapper,
  Section1,
  Section2,
  NonVaxStats,
  Wrapper2,
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
    <>
      <Wrapper>
        <Section1>
          <Item style={{ flex: 3 }}>Overall</Item>
          <Item style={{ flex: 2 }}>Vax progress bar</Item>
        </Section1>
        <Section1>
          <Item style={{ flex: 1 }}>Stat: DNC</Item>
          <Item style={{ flex: 1 }}>Stat: Rt</Item>
          <Item style={{ flex: 1 }}>Stat: Pos rate</Item>
          <Item style={{ flex: 2 }}>Stat: Vax</Item>
        </Section1>
      </Wrapper>
      <br />
      <br />
      <Wrapper2>
        <Section2 style={{ flex: 3 }}>
          <Item>Overall</Item>
          <NonVaxStats>
            <Item style={{ flex: 1 }}>Stat: DNC</Item>
            <Item style={{ flex: 1 }}>Stat: Rt</Item>
            <Item style={{ flex: 1 }}>Stat: Pos rate</Item>
          </NonVaxStats>
        </Section2>
        <Section2 style={{ flex: 2 }}>
          <Item>Vax progress bar</Item>
          <Item>Stat: Vax</Item>
        </Section2>
      </Wrapper2>
    </>
  );
};

export default RiskOverview;
