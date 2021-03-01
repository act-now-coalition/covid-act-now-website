import React from 'react';
import ThemesBlock from './ThemesBlock/ThemesBlock';
import {
  LocationPageSectionHeader,
  HeaderWrapper,
} from 'components/LocationPage/ChartsHolder.style';
import { Subtitle1 } from 'components/Typography';
import {
  BorderedContainer,
  FirstColumn,
  SecondColumn,
  TextSmall,
  LevelName,
  RegionDescription,
  StyledLink,
} from './VulnerabilitiesBlock.style';
import FooterLinks from './FooterLinks/FooterLinks';
import { renderRegionDescription } from 'common/ccvi/renderRegionDescription';
import CcviThermometer from './CcviThermometer/CcviThermometer';
import { getCcviLevelNameFromScore } from 'common/ccvi';
import { RegionCcviItem } from 'common/data';
import { vulnerabilitiesHeaderTooltip } from 'cms-content/tooltips';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import { trackOpenTooltip } from 'components/InfoTooltip';
import { Region } from 'common/regions';

const VulnerabilitiesBlock: React.FC<{
  scores: RegionCcviItem | null;
  region: Region;
}> = ({ scores, region }) => {
  if (!scores) {
    return null;
  }

  const levelName = getCcviLevelNameFromScore(scores.overall);

  return (
    <>
      <HeaderWrapper>
        <LocationPageSectionHeader>
          Vulnerabilities
          <>{renderVulnerabilitiesTooltip()}</>
        </LocationPageSectionHeader>
        {/* Share button */}
      </HeaderWrapper>
      <Subtitle1>In {region.fullName}</Subtitle1>
      <BorderedContainer>
        <FirstColumn>
          <TextSmall>OVERALL</TextSmall>
          <LevelName>{levelName}</LevelName>
          <CcviThermometer overallScore={scores.overall} />
          <RegionDescription>
            {region.shortName} {renderRegionDescription(scores.overall, region)}
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
