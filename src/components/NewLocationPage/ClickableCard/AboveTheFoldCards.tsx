import React from 'react';
import ClickableCard from './ClickableCard';
import AlertsIcon from 'assets/images/AlertsIcon';
import InfectionIcon from 'assets/images/InfectionIcon';
import MasksIcon from 'assets/images/MasksIcon';
import { SectionContainer } from 'components/NewLocationPage/Shared/Shared.style';
import {
  HighlightedSectionContainer,
  UnderlinedSpan,
} from './ClickableCard.style';

export const MasksCard: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <HighlightedSectionContainer>
      <ClickableCard
        onClick={onClick}
        icon={<MasksIcon />}
        cardLabel="Masks recommended"
        cardBody={
          <>
            CDC recommends masking indoors in this location due to high
            community risk levels
          </>
        }
      />
    </HighlightedSectionContainer>
  );
};

export const TransmissionMetricsCard: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <SectionContainer>
      <ClickableCard
        onClick={onClick}
        icon={<InfectionIcon />}
        cardLabel="Avoiding infection?"
        cardBody={
          <>
            People who need extra caution can still make decisions using{' '}
            <UnderlinedSpan>daily new cases</UnderlinedSpan>,{' '}
            <UnderlinedSpan>infection rate</UnderlinedSpan>, and{' '}
            <UnderlinedSpan>positive test rate</UnderlinedSpan>.
          </>
        }
      />
    </SectionContainer>
  );
};

export const AlertsCard: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <ClickableCard
      onClick={onClick}
      icon={<AlertsIcon />}
      cardLabel="Alerts"
      cardBody={
        <>
          Get emails when your location changes risk level or vaccine
          eligibility
        </>
      }
    />
  );
};
