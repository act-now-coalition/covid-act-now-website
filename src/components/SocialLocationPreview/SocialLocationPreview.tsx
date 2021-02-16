import React from 'react';

import { MetricValues } from 'common/models/Projections';

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
import SummaryStats from 'components/SummaryStats/SummaryStats';

export interface SocialLocationPreviewProps {
  regionName: string;
  fillColor: string;
  levelName: string;
  stats: MetricValues;
  lastUpdatedDateString: string;
}

const SocialLocationPreview = ({
  regionName,
  fillColor,
  levelName,
  lastUpdatedDateString,
  stats,
}: SocialLocationPreviewProps) => {
  return (
    <Wrapper>
      <PreviewHeader>
        <HeaderText>
          <HeaderHeader>{regionName}</HeaderHeader>
          <HeaderSubhead>Overall COVID risk</HeaderSubhead>
        </HeaderText>
        <AlarmLevel color={fillColor}>{levelName}</AlarmLevel>
      </PreviewHeader>
      <PreviewBody>
        <SummaryStats stats={stats} condensed={true} />
      </PreviewBody>
      <PreviewFooter>
        <FooterText>Last Updated {lastUpdatedDateString}</FooterText>
        <FooterText>covidactnow.org</FooterText>
      </PreviewFooter>
    </Wrapper>
  );
};

export default SocialLocationPreview;
