import React from 'react';
import {
  Column,
  ArrowIcon,
  FeaturedDescription,
  TextButton,
  Row,
  TestIcon,
} from './Menu.style';

const FeaturedSection: React.FC<{
  url: string;
  cta: string;
  description: string;
}> = ({ url, cta, description }) => {
  return (
    <Row>
      <TestIcon />
      <Column>
        <TextButton to={url} endIcon={<ArrowIcon />}>
          {cta}
        </TextButton>
        <FeaturedDescription>{description}</FeaturedDescription>
      </Column>
    </Row>
  );
};

export default FeaturedSection;
