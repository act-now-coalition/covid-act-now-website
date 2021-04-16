import React, { ComponentType } from 'react';
import { useModelLastUpdatedDate } from 'common/utils/model';

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

const SocialLocationPreview = (props: {
  border?: Boolean;
  isEmbed?: Boolean;
  Footer?: ComponentType;
  isEmbedPreview?: boolean;
}) => {
  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? lastUpdatedDate.toLocaleDateString() : '';
  const navigateToCAN = () => {
    window.top.location.href = 'https://covidactnow.org/';
    return false;
  };
  const Footer = props.Footer;
  const isEmbed = props.isEmbed;
  const showCountyView = !isEmbed && !props.isEmbedPreview;
  return (
    <Wrapper border={props.border}>
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

export default SocialLocationPreview;
