import _ from 'lodash';
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import { findCountyByFips } from 'common/locations';
import { useProjections } from 'common/utils/model';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { COLOR_MAP } from 'common/colors';
import LogoUrlLight from 'assets/images/logoUrlLight';
import SummaryStats from 'components/SummaryStats/SummaryStats';
import {
  HeaderText,
  AlarmLevel,
} from 'components/SocialLocationPreview/SocialLocationPreview.style';
import { US_MAP_EMBED_HEIGHT, US_MAP_EMBED_WIDTH } from './EmbedEnums';
import {
  EmbedContainer,
  EmbedWrapper,
  EmbedFooterWrapper,
  EmbedBody,
  EmbedHeaderWrapper,
  FooterDate,
  LogoWrapper,
  EmbedHeader,
  EmbedSubheader,
} from './Embed.style';
import SocialLocationPreview from 'components/SocialLocationPreview/SocialLocationPreview';

function LocationEmbed() {
  const { stateId: _location, countyId, countyFipsId } = useParams();

  const [selectedCounty, setSelectedCounty] = useState(null);
  const [location, setLocation] = useState(null);
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
  if (!projections) {
    return null;
  }

  const primary = projections.primary;
  if (!primary) {
    return <span>'No data available for county.'</span>;
  }

  const stats = projections.getMetricValues();
  const alarmLevel = projections.getAlarmLevel();
  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
  const fillColor =
    alarmLevel !== Level.UNKNOWN ? levelInfo.color : COLOR_MAP.GRAY.LIGHT;

  const embedOnClickBaseURL = projections
    ? `https://covidactnow.org/us/${location.toLowerCase()}${
        projections.isCounty
          ? `/county/${projections.county.county_url_name}`
          : ''
      }`
    : '';

  return (
    <EmbedContainer>
      <EmbedWrapper>
        <EmbedHeaderWrapper>
          <HeaderText>
            <EmbedHeader>
              {projections.countyName
                ? `${projections.countyName}, ${projections.stateCode}`
                : projections.stateName}
            </EmbedHeader>
            <EmbedSubheader>Overall COVID risk</EmbedSubheader>
          </HeaderText>
          <AlarmLevel color={fillColor}>{levelInfo.name}</AlarmLevel>
        </EmbedHeaderWrapper>
        <EmbedBody>
          <SummaryStats
            stats={stats}
            condensed={true}
            isEmbed={true}
            embedOnClickBaseURL={embedOnClickBaseURL}
          />
        </EmbedBody>
        <EmbedFooter />
      </EmbedWrapper>
    </EmbedContainer>
  );
}

export function EmbedFooter() {
  const lastUpdatedDate = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate && lastUpdatedDate.toLocaleDateString();

  return (
    <EmbedFooterWrapper>
      <LogoWrapper
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.covidactnow.org"
      >
        <LogoUrlLight height={15} />
      </LogoWrapper>
      <FooterDate>Last Updated {lastUpdatedDateString}</FooterDate>
    </EmbedFooterWrapper>
  );
}

export default function Embed(props) {
  const { isNational } = props;

  if (isNational) {
    return (
      <EmbedContainer height={US_MAP_EMBED_HEIGHT} width={US_MAP_EMBED_WIDTH}>
        <SocialLocationPreview border isEmbed Footer={EmbedFooter} />
      </EmbedContainer>
    );
  }

  return <LocationEmbed />;
}
