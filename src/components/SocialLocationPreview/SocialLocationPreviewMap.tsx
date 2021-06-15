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
import { Legend, LegendItem } from './Legend';

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
          {isEmbed && <MapLegend isEmbed />}
          <Map
            onClick={isEmbed ? navigateToCAN : undefined}
            showCounties={showCountyView}
          />
        </MapWrapper>
        {!isEmbed && (
          <USMapHeaderText>
            <MapLegend />
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

const MapLegend = ({ isEmbed = false }: { isEmbed?: boolean }) => (
  <Legend condensed={!isEmbed}>
    {[
      Level.SUPER_CRITICAL,
      Level.CRITICAL,
      Level.HIGH,
      Level.MEDIUM,
      Level.LOW,
    ].map(level => (
      <LegendItem
        key={'legend-{level}'}
        title={
          isEmbed
            ? LOCATION_SUMMARY_LEVELS[level].summary || ''
            : LOCATION_SUMMARY_LEVELS[level].name
        }
        color={LOCATION_SUMMARY_LEVELS[level].color}
      />
    ))}
  </Legend>
);

export default SocialLocationPreview;
