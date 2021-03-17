import React from 'react';
import { FeaturedItem } from 'cms-content/footer';
import EmailAlertIcon from 'assets/images/EmailAlertIcon';
import ApiIcon from 'assets/images/ApiIcon';
import {
  Column,
  ArrowIcon,
  FeaturedDescription,
  TextLink,
  Row,
  IconWrapper,
  RowWithSpacing,
} from './Menu.style';
// import { scrollWithOffset } from 'components/TableOfContents';

const FeaturedSection: React.FC<{
  section: FeaturedItem;
}> = ({ section }) => {
  const { url, cta, description, iconId } = section;

  const IconById = iconId === 'API' ? ApiIcon : EmailAlertIcon;

  return (
    <RowWithSpacing>
      <IconWrapper>
        <IconById height="36" width="40" aria-hidden="true" />
      </IconWrapper>
      <TextLink to={url}>
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
