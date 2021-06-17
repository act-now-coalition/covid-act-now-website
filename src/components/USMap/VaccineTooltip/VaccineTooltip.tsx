import { formatPercent } from 'common/utils';
import TextAndIconWithSpecialWrapping from 'components/TextAndIconWithSpecialWrapping/TextAndIconWithSpecialWrapping';
import { DotStyle } from 'components/VaccineDot/VaccineDot';
import { VaccineProgressBar } from 'components/VaccineProgressBar/VaccineProgressBar';
import React from 'react';
import {
  LocationNameArrowIcon,
  MoreDataLinkContainer,
  Container,
  Inner,
  LocationName,
  MoreDataLinkButton,
  ProgressBarWrapper,
  Row,
  StyledVaccineDot,
  Title,
  Value,
  MoreDataArrowIcon,
} from './VaccineTooltip.style';
import { State } from 'common/regions';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';

export interface VaccineTooltipProps {
  state: State;
  vaccinationsInitiated: number;
  vaccinationsCompleted: number;
  isMobileVersion?: boolean;
}

const VaccineTooltip: React.FC<VaccineTooltipProps> = ({
  state,
  vaccinationsInitiated,
  vaccinationsCompleted,
  isMobileVersion = false,
}) => {
  const locationName = state.fullName;
  return (
    <Container>
      <Inner>
        <LocationName $isMobileVersion={isMobileVersion}>
          {isMobileVersion ? (
            locationName
          ) : (
            <TextAndIconWithSpecialWrapping
              text={locationName}
              icon={<LocationNameArrowIcon />}
            />
          )}
        </LocationName>
        <Row>
          <Title>Fully vaccinated</Title>
          <Value>
            {formatPercent(vaccinationsCompleted)}
            <StyledVaccineDot
              vaccinationsInitiated={vaccinationsInitiated}
              dotStyle={DotStyle.SOLID}
            />
          </Value>
        </Row>
        <Row>
          <Title>1+ dose</Title>
          <Value>
            {formatPercent(vaccinationsInitiated)}
            <StyledVaccineDot
              vaccinationsInitiated={vaccinationsInitiated}
              dotStyle={DotStyle.HATCHED}
            />
          </Value>
        </Row>
        <ProgressBarWrapper>
          <VaccineProgressBar
            locationName={locationName}
            vaccinationsInitiated={vaccinationsInitiated}
            vaccinationsCompleted={vaccinationsCompleted}
          />
        </ProgressBarWrapper>
      </Inner>
      {isMobileVersion && (
        <MoreDataLinkContainer>
          <MoreDataLinkButton
            href={state.relativeUrl}
            aria-label={locationName}
            onClick={() => {
              trackMapClick(locationName);
            }}
            tabIndex={-1}
          >
            More data
            <MoreDataArrowIcon />
          </MoreDataLinkButton>
        </MoreDataLinkContainer>
      )}
    </Container>
  );
};

function trackMapClick(label: string) {
  trackEvent(EventCategory.MAP, EventAction.NAVIGATE, label);
}

export default VaccineTooltip;
