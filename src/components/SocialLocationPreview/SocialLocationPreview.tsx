import React from 'react';
import { Projections } from 'models/Projections';
import { useModelLastUpdatedDate } from 'utils/model';

import {
  Wrapper,
  PreviewHeader,
  HeaderText,
  HeaderHeader,
  MapHeaderHeader,
  HeaderSubhead,
  AlarmLevel,
  PreviewBody,
  PreviewFooter,
  FooterText,
  MapWrapper,
} from './SocialLocationPreview.style';
import { LEGEND_TEXT, Level } from 'enums/zones';
import Map from 'components/Map/Map';
import { COLOR_MAP } from 'enums/interventions';
import SummaryStats from 'components/SummaryStats/SummaryStats';
import { Legend, LegendItem } from 'components/Map/Legend';

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
        <PreviewHeader>
          <MapWrapper>
            <Map
              hideLegend={true}
              setMapOption={function () {}}
              setMobileMenuOpen={function () {}}
            />
          </MapWrapper>
          <HeaderText>
            <MapHeaderHeader>Who is ready to reopen?</MapHeaderHeader>
            <HeaderSubhead>RISK LEVELS</HeaderSubhead>
            <Legend condensed={true}>
              <LegendItem
                key={'legend-3'}
                title={LEGEND_TEXT[Level.HIGH].name}
                color={LEGEND_TEXT[Level.HIGH].color}
                description={LEGEND_TEXT[Level.HIGH].detail}
              />
              <LegendItem
                key={'legend-2'}
                title={LEGEND_TEXT[Level.MEDIUM].name}
                color={LEGEND_TEXT[Level.MEDIUM].color}
                description={LEGEND_TEXT[Level.MEDIUM].detail}
              />
              <LegendItem
                key={'legend-1'}
                title={LEGEND_TEXT[Level.LOW].name}
                color={LEGEND_TEXT[Level.LOW].color}
                description={LEGEND_TEXT[Level.LOW].detail}
              />
            </Legend>
          </HeaderText>
        </PreviewHeader>
        <PreviewFooter>
          <FooterText>Last Updated {lastUpdatedDateString}</FooterText>
          <FooterText>covidactnow.org</FooterText>
        </PreviewFooter>
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
