import React from 'react';
import { vulnerabilitiesHeaderTooltip } from 'cms-content/tooltips';
import ThemesBlock from './ThemesBlock/ThemesBlock';
import { LocationPageSectionHeader } from 'components/LocationPage/ChartsHolder.style';
import { Subtitle1 } from 'components/Typography';
import {
  BorderedContainer,
  FirstColumn,
  SecondColumn,
  TextSmall,
  LevelName,
  RegionDescription,
  StyledLink,
  HeaderWrapper,
} from './VulnerabilitiesBlock.style';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import { trackOpenTooltip } from 'components/InfoTooltip';
import ShareButtons from './ShareButtons';
import FooterLinks from './FooterLinks/FooterLinks';
import CcviThermometer from './CcviThermometer/CcviThermometer';
import { renderRegionDescription } from 'common/ccvi/renderRegionDescription';
import { getCcviLevelNameFromScore } from 'common/ccvi';
import { getShareQuote } from 'common/ccvi/getShareQuote';
import { Region } from 'common/regions';
import { RegionCcviItem, getVulnPopulationPercentForFips } from 'common/data';

const VulnerabilitiesBlock: React.FC<{
  scores: RegionCcviItem | null;
  region: Region;
}> = ({ scores, region }) => {
  if (!scores) {
    return null;
  }

  const levelName = getCcviLevelNameFromScore(scores.overall);
  const percentPopulationVulnerable = getVulnPopulationPercentForFips(
    region.fipsCode,
  );
  const regionDescription = renderRegionDescription(
    scores.overall,
    region,
    percentPopulationVulnerable,
  );
  const shareUrl = `${region.canonicalUrl}#vulnerabilities`;
  const shareQuote = getShareQuote(
    scores.overall,
    region,
    percentPopulationVulnerable,
  );

  return (
    <>
      <HeaderWrapper>
        <LocationPageSectionHeader>
          Vulnerabilities
          <>{renderVulnerabilitiesTooltip()}</>
        </LocationPageSectionHeader>
        <ShareButtons shareUrl={shareUrl} shareQuote={shareQuote} />
      </HeaderWrapper>
      <Subtitle1>In {region.fullName}</Subtitle1>
      <BorderedContainer>
        <FirstColumn>
          <TextSmall>OVERALL</TextSmall>
          <LevelName aria-label={levelName.toLowerCase()}>
            {levelName}
          </LevelName>
          <CcviThermometer
            overallScore={scores.overall}
            regionName={region.shortName}
          />
          <RegionDescription>
            {region.shortName} {regionDescription}
          </RegionDescription>
        </FirstColumn>
        <SecondColumn>
          <TextSmall>SPECIFIC VULNERABILITIES</TextSmall>
          <ThemesBlock scores={scores} />
        </SecondColumn>
      </BorderedContainer>
      <StyledLink href="https://precisionforcovid.org/ccvi">
        How the vulnerability score is calculated
      </StyledLink>
      <FooterLinks region={region} />
    </>
  );
};

function renderVulnerabilitiesTooltip(): React.ReactElement {
  return (
    <InfoTooltip
      title={renderTooltipContent(vulnerabilitiesHeaderTooltip)}
      aria-label="Description of vulnerabilities"
      trackOpenTooltip={() => trackOpenTooltip('Vulnerabilities header')}
    />
  );
}

export default VulnerabilitiesBlock;
