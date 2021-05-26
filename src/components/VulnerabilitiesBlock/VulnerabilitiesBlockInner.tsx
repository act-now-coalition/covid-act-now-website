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
import { Region, County } from 'common/regions';
import { RegionCcviItem } from 'common/data';
import { getSurgoUrlByRegion } from 'common/ccvi/index';
import { EventCategory } from 'components/Analytics';
import { TextButton } from 'components/ButtonSystem';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

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

  const surgoUrl = getSurgoUrlByRegion(region);
  const surgoUrlCta =
    region instanceof County ? 'View by neighborhood' : 'View by county';

  return (
    <Content>
      <FirstColumn>
        <TextSmall>VULNERABILITY LEVEL</TextSmall>
        <LevelName aria-label={levelName.toLowerCase()}>{levelName}</LevelName>
        <CcviThermometer
          overallScore={scores.overall}
          regionName={region.shortName}
        />
        <SummaryText>
          {region.shortName} {regionDescription}
        </SummaryText>
        <SummaryText>{communityVulnerabilityQuote}</SummaryText>
        {surgoUrl && (
          <SummaryText>
            <TextButton
              href={surgoUrl}
              trackingCategory={EventCategory.VULNERABILITIES}
              trackingLabel={'Surgo link'}
              endIcon={<OpenInNewIcon />}
            >
              {surgoUrlCta}
            </TextButton>
          </SummaryText>
        )}
      </FirstColumn>
      <SecondColumn>
        <TextSmall>WHAT MAKES THIS AREA VULNERABLE</TextSmall>
        <ThemesBlock scores={scores} />
      </SecondColumn>
    </Content>
  );
};

export default VulnerabilitiesBlockInner;
