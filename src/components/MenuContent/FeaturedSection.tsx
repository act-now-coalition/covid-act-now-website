import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { FeaturedItem, SectionId } from 'cms-content/footer';
import ApiIcon from 'assets/images/ApiIcon';
import DailyDownloadIcon from 'assets/images/DailyDownloadIcon';
import AlertsIcon from 'assets/images/AlertsIcon';
import {
  Column,
  ArrowIcon,
  FeaturedDescription,
  TextLink,
  Row,
  IconWrapper,
  RowWithSpacing,
  Section,
  SectionHeader,
} from './Menu.style';
import { scrollWithOffset } from 'components/TableOfContents';
import {
  Experiment,
  ExperimentID,
  Variant,
  VariantID,
} from 'components/Experiment';

const FeaturedSection: React.FC<{
  featuredSections: FeaturedItem[];
  onClick: (label: string) => void;
}> = ({ featuredSections, onClick }) => {
  const idToIconMap = {
    [SectionId.API]: ApiIcon,
    [SectionId.DAILY_DOWNLOAD]: DailyDownloadIcon,
    [SectionId.ALERTS]: AlertsIcon,
  };

  return (
    <Section>
      <SectionHeader $desktopOnly={true}>Featured</SectionHeader>
      {featuredSections.map((section: FeaturedItem) => {
        const { url, cta, description, iconId } = section;

        const Icon = idToIconMap[iconId];

        const hashlinkProps =
          iconId === SectionId.ALERTS
            ? {
                as: HashLink,
                scroll: (element: HTMLElement) =>
                  scrollWithOffset(element, -80),
              }
            : {};

        const testAPITitle = 'Data API';
        const testAPIDescription =
          'Get realtime, local data including daily new cases, % vaccinated, and more.';

        return (
          <RowWithSpacing onClick={() => onClick(cta)} key={cta}>
            <IconWrapper>
              <Icon height="36" width="40" aria-hidden="true" />
            </IconWrapper>
            <TextLink to={url} {...hashlinkProps}>
              {iconId === 'API' && (
                <Column>
                  <Experiment id={ExperimentID.HAMBURGER_MENU_DESKTOP}>
                    <Variant id={VariantID.A}>
                      <Row>
                        {cta}
                        <ArrowIcon />
                      </Row>
                      <FeaturedDescription>{description}</FeaturedDescription>
                    </Variant>
                    <Variant id={VariantID.B}>
                      <Row>
                        {testAPITitle}
                        <ArrowIcon />
                      </Row>
                      <FeaturedDescription>
                        {testAPIDescription}
                      </FeaturedDescription>
                    </Variant>
                  </Experiment>
                </Column>
              )}
              {iconId !== 'API' && (
                <Column>
                  <Row>
                    {cta}
                    <ArrowIcon />
                  </Row>
                  <FeaturedDescription>{description}</FeaturedDescription>
                </Column>
              )}
            </TextLink>
          </RowWithSpacing>
        );
      })}
    </Section>
  );
};

export default FeaturedSection;
