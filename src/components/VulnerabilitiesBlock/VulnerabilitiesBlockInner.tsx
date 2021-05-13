import React from 'react';
import ThemesBlock from './ThemesBlock/ThemesBlock';
import {
  Content,
  FirstColumn,
  SecondColumn,
  TextSmall,
  LevelName,
  SummaryText,
} from './VulnerabilitiesBlock.style';
import CcviThermometer from './CcviThermometer/CcviThermometer';
import { renderRegionDescription } from 'common/ccvi/renderRegionDescription';
import { getCcviLevelNameFromScore } from 'common/ccvi';
import { Region } from 'common/regions';
import { RegionCcviItem } from 'common/data';

const VulnerabilitiesBlockInner: React.FC<{
  scores: RegionCcviItem;
  region: Region;
  percentPopulationVulnerable: number | undefined;
}> = ({ scores, region, percentPopulationVulnerable }) => {
  const levelName = getCcviLevelNameFromScore(scores.overall);

  const regionDescription = renderRegionDescription(
    scores.overall,
    region,
    percentPopulationVulnerable,
  );

  const communityVulnerabilityQuote =
    'Communities with higher vulnerability have pre-existing economic, social, and physical conditions that may make it hard to respond to and recover from a COVID outbreak.';

  return (
    <Content>
      <FirstColumn>
        <TextSmall>OVERALL</TextSmall>
        <LevelName aria-label={levelName.toLowerCase()}>{levelName}</LevelName>
        <CcviThermometer
          overallScore={scores.overall}
          regionName={region.shortName}
        />
        <SummaryText>
          {region.shortName} {regionDescription}
        </SummaryText>
        <SummaryText>{communityVulnerabilityQuote}</SummaryText>
      </FirstColumn>
      <SecondColumn>
        <TextSmall>WHAT MAKES THIS AREA VULNERABLE</TextSmall>
        <ThemesBlock scores={scores} />
      </SecondColumn>
    </Content>
  );
};

export default VulnerabilitiesBlockInner;
