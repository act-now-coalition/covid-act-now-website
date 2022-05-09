import React from 'react';
import LabelWithChevron from 'components/NewLocationPage/Shared/LabelWithChevron';
import { Button, Subtext, Section } from './ClickableCard.style';

const ClickableCard: React.FC<{
  onClick?: () => void;
  href?: string;
  cardLabel: string;
  cardBody: React.ReactElement;
  icon: React.ReactElement;
}> = ({ onClick = () => {}, cardLabel, cardBody, icon, href }) => {
  const buttonProps = { href, onClick };
  return (
    <Button {...buttonProps}>
      <Section>{icon}</Section>
      <Section style={{ textAlign: 'left' }}>
        <LabelWithChevron text={cardLabel} />
        <Subtext>{cardBody}</Subtext>
      </Section>
    </Button>
  );
};

export default ClickableCard;
