import React from 'react';

//import '../../App.css'; /* optional for styling like the :hover pseudo-class */

import LogoUrlLight from 'assets/images/logoUrlLight';
import { MetricValues } from 'common/models/Projections';
import SummaryStats from 'components/SummaryStats/SummaryStats';
import {
  HeaderText,
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
  EmbedHeader,
  EmbedSubheader,
} from './Embed.style';

export interface LocationEmbedProps {
  regionName: string;
  fillColor: string;
  levelName: string;
  stats: MetricValues;
  embedOnClickBaseURL: string;
  lastUpdatedDateString: string;
}

export function LocationEmbed({
  regionName,
  fillColor,
  levelName,
  stats,
  embedOnClickBaseURL,
  lastUpdatedDateString,
}: LocationEmbedProps) {
  return (
    <EmbedContainer>
      <EmbedWrapper>
        <EmbedHeaderWrapper>
          <HeaderText>
            <EmbedHeader>{regionName}</EmbedHeader>
            <EmbedSubheader>Overall COVID risk</EmbedSubheader>
          </HeaderText>
          <AlarmLevel color={fillColor}>{levelName}</AlarmLevel>
        </EmbedHeaderWrapper>
        <EmbedBody>
          <SummaryStats
            stats={stats}
            condensed={true}
            isEmbed={true}
            embedOnClickBaseURL={embedOnClickBaseURL}
          />
        </EmbedBody>
        <EmbedFooter lastUpdatedDateString={lastUpdatedDateString} />
      </EmbedWrapper>
    </EmbedContainer>
  );
}

export function EmbedFooter({
  lastUpdatedDateString,
}: {
  lastUpdatedDateString: string;
}) {
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
