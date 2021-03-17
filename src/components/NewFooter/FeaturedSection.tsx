import React from 'react';
import { FeaturedItem } from 'cms-content/footer';
import EmailAlertIcon from 'assets/images/EmailAlertIcon';
import ApiIcon from 'assets/images/ApiIcon';
import {
  Column,
  ArrowIcon,
  FeaturedDescription,
  TextButton,
  Row,
  IconWrapper,
  RowWithSpacing,
} from './Menu.style';
import { scrollWithOffset } from 'components/TableOfContents';

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
      <TextButton
        to={url}
        scroll={(element: any) => scrollWithOffset(element, -80)}
      >
        <Column>
          <Row>
            {cta}
            <ArrowIcon />
          </Row>
          <FeaturedDescription>{description}</FeaturedDescription>
        </Column>
      </TextButton>
    </RowWithSpacing>
  );
};

export default FeaturedSection;
