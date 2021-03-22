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
} from './Menu.style';
import { scrollWithOffset } from 'components/TableOfContents';

const FeaturedSection: React.FC<{
  section: FeaturedItem;
  trackMenuEvent: any;
}> = ({ section, trackMenuEvent }) => {
  const { url, cta, description, iconId } = section;

  const idToIconMap = {
    [SectionId.API]: ApiIcon,
    [SectionId.DAILY_DOWNLOAD]: DailyDownloadIcon,
    [SectionId.ALERTS]: AlertsIcon,
  };
  const Icon = idToIconMap[iconId];

  const hashlinkProps =
    iconId === SectionId.ALERTS
      ? {
          as: HashLink,
          scroll: (element: HTMLElement) => scrollWithOffset(element, -80),
        }
      : {};

  return (
    <RowWithSpacing onClick={trackMenuEvent(cta)}>
      <IconWrapper>
        <Icon height="36" width="40" aria-hidden="true" />
      </IconWrapper>
      <TextLink to={url} {...hashlinkProps}>
        <Column>
          <Row>
            {cta}
            <ArrowIcon />
          </Row>
          <FeaturedDescription>{description}</FeaturedDescription>
        </Column>
      </TextLink>
    </RowWithSpacing>
  );
};

export default FeaturedSection;
