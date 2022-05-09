import React from 'react';
import ClickableCard from './ClickableCard';
import AlertsIcon from 'assets/images/AlertsIcon';
import InfectionIcon from 'assets/images/InfectionIcon';
import MasksIcon from 'assets/images/MasksIcon';
import { SectionContainer } from 'components/NewLocationPage/Shared/Shared.style';
import { HighlightedSectionContainer } from './ClickableCard.style';

// Chelsi - onClicks
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
            community levels
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
            <strong>daily new cases</strong>, <strong>infection rate</strong>,
            and <strong>positive test rate</strong>.
          </>
        }
      />
    </SectionContainer>
  );
};

export const AlertsCard = () => {
  return (
    <ClickableCard
      onClick={() => {}}
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
