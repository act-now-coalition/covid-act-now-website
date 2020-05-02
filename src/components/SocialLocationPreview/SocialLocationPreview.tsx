import React from 'react';
import { Projections } from 'models/Projections';
import { useModelLastUpdatedDate } from 'utils/model';

import {
  Wrapper,
  PreviewHeader,
  HeaderText,
  HeaderHeader,
  HeaderSubhead,
  AlarmLevel,
  PreviewBody,
  PreviewFooter,
  FooterText,
} from './SocialLocationPreview.style';
import { LEGEND_TEXT, Level } from 'enums/zones';
import Map from 'components/Map/Map';
import { COLOR_MAP } from 'enums/interventions';
import SummaryStats from 'components/SummaryStats/SummaryStats';

const SocialLocationPreview = (props: {
  projections?: Projections;
  stats?: { [key: string]: number | null };
}) => {
  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? lastUpdatedDate.toLocaleDateString() : '';

  if (!props.projections || !props.stats) {
    return (
      <Wrapper hasMap={true}>
        <Map
          hideLegend={true}
          setMapOption={function () {}}
          setMobileMenuOpen={function () {}}
        />
      </Wrapper>
    );
  }

  const alarmLevel = props.projections.getAlarmLevel();
  const levelInfo = LEGEND_TEXT[alarmLevel];
  const fillColor =
    alarmLevel !== Level.UNKNOWN ? levelInfo.color : COLOR_MAP.GRAY.LIGHT;

  return (
    <Wrapper>
      <PreviewHeader>
        <HeaderText>
          <HeaderHeader>{props.projections.stateName}</HeaderHeader>
          <HeaderSubhead>Overall risk if reopening</HeaderSubhead>
        </HeaderText>
        <AlarmLevel color={fillColor}>{levelInfo.name}</AlarmLevel>
      </PreviewHeader>
      <PreviewBody>
        <SummaryStats stats={props.stats} condensed={true} />
      </PreviewBody>
      <PreviewFooter>
        <FooterText>Last Updated {lastUpdatedDateString}</FooterText>
        <FooterText>covidactnow.org</FooterText>
      </PreviewFooter>
    </Wrapper>
  );
};

export default SocialLocationPreview;
