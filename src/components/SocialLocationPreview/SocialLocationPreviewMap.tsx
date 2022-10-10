import React, { ComponentType } from 'react';
import { useModelLastUpdatedDate } from 'common/utils/model';

import {
  Wrapper,
  USMapPreviewHeader,
  USMapHeaderText,
  MapHeader,
  LastUpdatedWrapper,
  PreviewFooter,
  FooterText,
  MapWrapper,
} from './SocialLocationPreview.style';
import { Level } from 'common/level';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import USRiskMap from 'components/USMap/USRiskMap';
import USVaccineMap from 'components/USMap/USVaccineMap';
import { Legend, LegendItem } from './Legend';
import { thermometerSections } from 'components/HorizontalThermometer/VaccinationsThermometer/VaccinationsThermometer';

const SocialLocationPreview = (props: {
  border?: boolean;
  isEmbed?: boolean;
  isRiskMap?: boolean;
  Footer?: ComponentType;
  isEmbedPreview?: boolean;
}) => {
  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? lastUpdatedDate.toLocaleDateString() : '';
  const { border, Footer, isEmbed, isEmbedPreview, isRiskMap } = props;
  const showCountyView = !isEmbed && !isEmbedPreview;
  // TODO(michael): 2021-06-24: I'm going out on a limb and switching our embeds
  // over to the vaccine map too, but if anybody complains we could change this
  // to only show when `!isEmbed` so we don't affect embeds on people's sites.
  const showVaccineMap = !isRiskMap;
  const Map = showVaccineMap ? USVaccineMap : USRiskMap;
  const MapLegend = showVaccineMap ? VaccineMapLegend : RiskMapLegend;

  return (
    <Wrapper noShadow={!isEmbedPreview} border={border}>
      <MapHeader>US COVID Tracker</MapHeader>
      {!isEmbedPreview && (
        <LastUpdatedWrapper>Updated {lastUpdatedDateString}</LastUpdatedWrapper>
      )}
      <USMapPreviewHeader border={isEmbedPreview} sideLegend={!isEmbed}>
        <MapWrapper>
          {isEmbed && <MapLegend isEmbed />}
          <Map showCounties={showCountyView} />
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
        isEmbedPreview && (
          <PreviewFooter>
            <FooterText>Last Updated {lastUpdatedDateString}</FooterText>
            <FooterText>covidactnow.org</FooterText>
          </PreviewFooter>
        )
      )}
    </Wrapper>
  );
};

const RiskMapLegend = ({ isEmbed = false }: { isEmbed?: boolean }) => (
  <Legend condensed={!isEmbed} header="Community Risk Level">
    {[Level.HIGH, Level.MEDIUM, Level.LOW].map(level => (
      <LegendItem
        key={`legend-${level}`}
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

const VaccineMapLegend = ({ isEmbed = false }: { isEmbed?: boolean }) => (
  <Legend condensed={!isEmbed} header="Pop. with 1+ dose">
    {thermometerSections.map((section, i) => (
      <LegendItem
        key={`legend-${i}`}
        title={section.labelRange}
        color={section.color}
      />
    ))}
  </Legend>
);

export default SocialLocationPreview;
