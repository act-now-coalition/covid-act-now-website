import React, { ComponentType } from 'react';

import {
  Wrapper,
  USMapPreviewHeader,
  USMapHeaderText,
  MapHeaderHeader,
  PreviewFooter,
  FooterText,
  MapWrapper,
} from './SocialLocationPreview.style';
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import Map from 'components/Map/Map';
import { Legend, LegendItem } from 'components/Map/Legend';

const SocialLocationPreviewMap = (props: {
  lastUpdatedDateString: string;
  border?: Boolean;
  isEmbed?: Boolean;
  Footer?: ComponentType;
  isEmbedPreview?: boolean;
}) => {
  const navigateToCAN = () => {
    window.top.location.href = 'https://covidactnow.org/';
    return false;
  };
  const {
    border,
    Footer,
    isEmbed,
    isEmbedPreview,
    lastUpdatedDateString,
  } = props;
  const showCountyView = !isEmbed && !isEmbedPreview;
  return (
    <Wrapper border={border}>
      <MapHeaderHeader>US COVID Risk &amp; Vaccine Tracker</MapHeaderHeader>
      <USMapPreviewHeader sideLegend={!isEmbed}>
        <MapWrapper>
          <Map
            onClick={isEmbed ? navigateToCAN : undefined}
            hideLegend={!isEmbed}
            hideLegendTitle={true}
            hideInstructions={true}
            showCounties={showCountyView}
          />
        </MapWrapper>
        {isEmbed ? (
          ''
        ) : (
          <USMapHeaderText>
            <Legend condensed={true}>
              <LegendItem
                key={'legend-5'}
                title={LOCATION_SUMMARY_LEVELS[Level.SUPER_CRITICAL].name}
                color={LOCATION_SUMMARY_LEVELS[Level.SUPER_CRITICAL].color}
              />
              <LegendItem
                key={'legend-4'}
                title={LOCATION_SUMMARY_LEVELS[Level.CRITICAL].name}
                color={LOCATION_SUMMARY_LEVELS[Level.CRITICAL].color}
              />
              <LegendItem
                key={'legend-3'}
                title={LOCATION_SUMMARY_LEVELS[Level.HIGH].name}
                color={LOCATION_SUMMARY_LEVELS[Level.HIGH].color}
              />
              <LegendItem
                key={'legend-2'}
                title={LOCATION_SUMMARY_LEVELS[Level.MEDIUM].name}
                color={LOCATION_SUMMARY_LEVELS[Level.MEDIUM].color}
              />
              <LegendItem
                key={'legend-1'}
                title={LOCATION_SUMMARY_LEVELS[Level.LOW].name}
                color={LOCATION_SUMMARY_LEVELS[Level.LOW].color}
              />
            </Legend>
          </USMapHeaderText>
        )}
      </USMapPreviewHeader>
      {Footer ? (
        <Footer />
      ) : (
        <PreviewFooter>
          <FooterText>Last Updated {lastUpdatedDateString}</FooterText>
          <FooterText>covidactnow.org</FooterText>
        </PreviewFooter>
      )}
    </Wrapper>
  );
};

export default SocialLocationPreviewMap;
