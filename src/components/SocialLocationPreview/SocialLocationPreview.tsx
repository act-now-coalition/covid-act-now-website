import React from 'react';
import { Projections } from 'common/models/Projections';
import { useModelLastUpdatedDate } from 'common/utils/model';

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
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import Map from 'components/Map/Map';
import { COLOR_MAP } from 'common/colors';
import SummaryStats from 'components/SummaryStats/SummaryStats';
import { Legend, LegendItem } from 'components/Map/Legend';
import * as StyleLegend from 'components/Map/Legend.style';

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
            <MapHeaderHeader>America’s COVID warning system</MapHeaderHeader>
            <HeaderSubhead>Risk levels</HeaderSubhead>
            <Legend condensed={true}>
              <StyleLegend.LegendItemContainer key={'legend-4'}>
                <LegendItem
                  title={LOCATION_SUMMARY_LEVELS[Level.HIGH].name}
                  color={LOCATION_SUMMARY_LEVELS[Level.HIGH].color}
                />
              </StyleLegend.LegendItemContainer>
              <StyleLegend.LegendItemContainer key={'legend-3'}>
                <LegendItem
                  title={LOCATION_SUMMARY_LEVELS[Level.MEDIUM_HIGH].name}
                  color={LOCATION_SUMMARY_LEVELS[Level.MEDIUM_HIGH].color}
                />
              </StyleLegend.LegendItemContainer>
              <StyleLegend.LegendItemContainer key={'legend-2'}>
                <LegendItem
                  title={LOCATION_SUMMARY_LEVELS[Level.MEDIUM].name}
                  color={LOCATION_SUMMARY_LEVELS[Level.MEDIUM].color}
                />
              </StyleLegend.LegendItemContainer>
              <StyleLegend.LegendItemContainer key={'legend-1'}>
                <LegendItem
                  title={LOCATION_SUMMARY_LEVELS[Level.LOW].name}
                  color={LOCATION_SUMMARY_LEVELS[Level.LOW].color}
                />
              </StyleLegend.LegendItemContainer>
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
  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
  const fillColor =
    alarmLevel !== Level.UNKNOWN ? levelInfo.color : COLOR_MAP.GRAY.LIGHT;

  return (
    <Wrapper>
      <PreviewHeader>
        <HeaderText>
          <HeaderHeader>
            {props.projections.countyName
              ? `${props.projections.countyName}, ${props.projections.stateCode}`
              : props.projections.stateName}
          </HeaderHeader>
          <HeaderSubhead>Overall COVID risk</HeaderSubhead>
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
