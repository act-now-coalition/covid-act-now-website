import React from 'react';
import AlertsIcon from 'assets/images/AlertsIcon';
import LabelWithChevron from 'components/NewLocationPage/Shared/LabelWithChevron';
import { Button, Subtext, Section } from './AlertsButton.style';

const AlertsButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Section>
        <AlertsIcon />
      </Section>
      <Section>
        <LabelWithChevron text="Alerts" />
        <Subtext>
          Get emails when your location changes risk level or vaccine
          eligibility
        </Subtext>
      </Section>
    </Button>
  );
};

export default AlertsButton;
