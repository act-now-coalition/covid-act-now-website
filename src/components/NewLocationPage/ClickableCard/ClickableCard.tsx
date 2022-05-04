import React from 'react';
import LabelWithChevron from 'components/NewLocationPage/Shared/LabelWithChevron';
import { Button, Subtext, Section } from './ClickableCard.style';

// Chelsi - anys
const ClickableCard: React.FC<{
  onClick?: () => void;
  href?: string;
  cardLabel: string;
  cardBody: any;
  icon: any;
}> = ({ onClick = () => {}, cardLabel, cardBody, icon, href }) => {
  const buttonProp = href ? { href } : { onClick };
  return (
    <Button {...buttonProp}>
      <Section>{icon}</Section>
      <Section style={{ textAlign: 'left' }}>
        <LabelWithChevron text={cardLabel} />
        <Subtext>{cardBody}</Subtext>
      </Section>
    </Button>
  );
};

export default ClickableCard;
