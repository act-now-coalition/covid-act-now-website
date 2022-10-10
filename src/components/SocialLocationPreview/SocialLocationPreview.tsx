import React from 'react';
import { Projections } from 'common/models/Projections';
import { useModelLastUpdatedDate } from 'common/utils/model';

import {
  Wrapper,
  PreviewHeader,
  HeaderText,
  SocialLocationPreviewHeader,
  HeaderSubhead,
  AlarmLevel,
  PreviewBody,
  PreviewFooter,
  FooterText,
} from './SocialLocationPreview.style';
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { COLOR_MAP } from 'common/colors';
import SummaryStats from 'components/SummaryStats/SummaryStats';

const SocialLocationPreview = (props: {
  projections: Projections;
  stats: { [key: string]: number | null };
}) => {
  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? lastUpdatedDate.toLocaleDateString() : '';

  const alarmLevel = props.projections.getAlarmLevel();
  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
  const fillColor =
    alarmLevel !== Level.UNKNOWN ? levelInfo.color : COLOR_MAP.GRAY.LIGHT;

  return (
    <Wrapper>
      <PreviewHeader>
        <HeaderText>
          <SocialLocationPreviewHeader>
            {props.projections?.region.fullName}
          </SocialLocationPreviewHeader>
          <HeaderSubhead>covid community risk level</HeaderSubhead>
        </HeaderText>
        <AlarmLevel color={fillColor}>{levelInfo.name}</AlarmLevel>
      </PreviewHeader>
      <PreviewBody>
        <SummaryStats stats={props.stats} />
      </PreviewBody>
      <PreviewFooter>
        <FooterText>Last Updated {lastUpdatedDateString}</FooterText>
        <FooterText>covidactnow.org</FooterText>
      </PreviewFooter>
    </Wrapper>
  );
};

export default SocialLocationPreview;
