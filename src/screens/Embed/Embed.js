import _ from 'lodash';
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import { findCountyByFips } from 'common/locations';
import { useProjections } from 'common/utils/model';
import { useEmbed } from 'common/utils/hooks';
import { Projection } from 'common/models/Projection';
import { Metric } from 'common/metric';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { COLOR_MAP } from 'common/colors';
import { STATES } from 'common';
import LogoUrlLight from 'assets/images/logoUrlLight';
import SummaryStats from 'components/SummaryStats/SummaryStats';
import {
  HeaderText,
  HeaderHeader,
  HeaderSubhead,
  AlarmLevel,
} from 'components/SocialLocationPreview/SocialLocationPreview.style';
import {
  EmbedContainer,
  EmbedWrapper,
  EmbedFooterWrapper,
  EmbedBody,
  EmbedHeaderWrapper,
  FooterDate,
  LogoWrapper,
} from './Embed.style';

export default function Embed() {
  const { stateId: _location, countyId, countyFipsId } = useParams();

  const [selectedCounty, setSelectedCounty] = useState(null);
  const [location, setLocation] = useState(null);
  const { iFrameCodeSnippet } = useEmbed();
  useMemo(() => {
    let state = null,
      county = null;
    if (countyFipsId) {
      county = findCountyByFips(countyFipsId);
      state = county?.state_code;
    } else {
      state = _location.toUpperCase();
      if (countyId) {
        county = _.find(
          US_STATE_DATASET.state_county_map_dataset[state].county_dataset,
          ['county_url_name', countyId],
        );
      }
    }

    setLocation(state);
    if (county !== undefined) {
      setSelectedCounty(county);
    }
  }, [_location, countyId, countyFipsId]);

  const projections = useProjections(location, selectedCounty);

  const getChartSummarys = (projection = Projection) => {
    return {
      [Metric.CASE_GROWTH_RATE]: projection.rt,
      [Metric.HOSPITAL_USAGE]: projection.currentIcuUtilization,
      [Metric.POSITIVE_TESTS]: projection.currentTestPositiveRate,
      [Metric.CONTACT_TRACING]: projection.currentContactTracerMetric,
    };
  };

  const projection = projections ? projections.primary : {};

  const stats = projection ? getChartSummarys(projection) : {};

  if (!projections) {
    return null;
  }

  const primary = projections.primary;
  if (!primary) {
    return <span>'No data available for county.'</span>;
  }

  const alarmLevel = projections.getAlarmLevel();
  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
  const fillColor =
    alarmLevel !== Level.UNKNOWN ? levelInfo.color : COLOR_MAP.GRAY.LIGHT;

  return (
    <EmbedContainer elevation="2">
      <EmbedWrapper>
        <EmbedHeaderWrapper>
          <HeaderText>
            <HeaderHeader>
              {projections.countyName
                ? `${projections.countyName}, ${projections.stateCode}`
                : projections.stateName}
            </HeaderHeader>
            <HeaderSubhead>Overall COVID risk</HeaderSubhead>
          </HeaderText>
          <AlarmLevel color={fillColor}>{levelInfo.name}</AlarmLevel>
        </EmbedHeaderWrapper>
        <EmbedBody>
          <SummaryStats stats={stats} condensed={true} />
        </EmbedBody>
        <EmbedFooterWrapper>
          <LogoWrapper
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.covidactnow.org"
          >
            <LogoUrlLight height={15} />
          </LogoWrapper>
          <FooterDate>Last Updated 5/29/2020</FooterDate>
        </EmbedFooterWrapper>
      </EmbedWrapper>
    </EmbedContainer>
  );
}
