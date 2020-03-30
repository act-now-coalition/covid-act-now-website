import React from 'react';
import {
  INTERVENTIONS,
  INTERVENTION_COLOR_MAP,
  INTERVENTION_DESCRIPTIONS,
} from 'enums';
import {
  WarnLimitedAction,
  WarnSocialDistancing,
  CheckShelterInPlace,
  WarnShelterInPlaceWorstCase,
} from 'assets/images/capacityIcons';
import InterventionIcon from 'assets/images/interventionIcon';
import {
  CallToActionBox,
  Section,
  Content,
  Title,
  Icon,
  Text,
  Primary,
  Detail,
} from './CallToAction.style';

const DAYS = 1000 * 60 * 60 * 24;
const ONE_HUNDRED_DAYS = 100 * DAYS;

const CallToAction = ({ interventions, currentIntervention }) => {
  const calloutDataForModel = model => {
    if (
      !model.dateOverwhelmed ||
      model.dateOverwhelmed - new Date() > ONE_HUNDRED_DAYS
    ) {
      return {
        label: `Reduced overload projected`,
        shortActionText: `We project a reduced overload over the next 3 months`,
        capacityIcon: <CheckShelterInPlace />,
      };
    } else {
      const earlyDate = new Date(model.dateOverwhelmed.getTime() - 14 * DAYS);
      const lateDate = new Date(model.dateOverwhelmed.getTime() - 9 * DAYS);

      const isShelterInPlaceWorstCaseModel =
        currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE &&
        model.intervention === INTERVENTIONS.SOCIAL_DISTANCING;
      let capacityIcon;
      if (isShelterInPlaceWorstCaseModel) {
        capacityIcon = <WarnShelterInPlaceWorstCase />;
      } else {
        if (model.intervention === INTERVENTIONS.LIMITED_ACTION) {
          capacityIcon = <WarnLimitedAction />;
        } else {
          capacityIcon = <WarnSocialDistancing />;
        }
      }

      return {
        label: `Overload projected`,
        shortActionText: `We project hospitals will begin to become overloaded between ${formatDate(
          earlyDate,
        )} and ${formatDate(lateDate)}.`,
        capacityIcon,
      };
    }
  };

  const interventionToModel = {
    [INTERVENTIONS.LIMITED_ACTION]: interventions.baseline,
    [INTERVENTIONS.SOCIAL_DISTANCING]:
      interventions.distancingPoorEnforcement.now,
    [INTERVENTIONS.SHELTER_IN_PLACE]: interventions.distancing.now,
  };

  const model = interventionToModel[currentIntervention];
  const interventionCalloutData = calloutDataForModel(model);

  let worstCaseModel, worstCaseCalloutData;
  if (currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE) {
    worstCaseModel = interventionToModel[INTERVENTIONS.SOCIAL_DISTANCING];
    worstCaseCalloutData = calloutDataForModel(worstCaseModel);
  }

  const interventionIcon = (
    <InterventionIcon color={INTERVENTION_COLOR_MAP[currentIntervention]} />
  );

  return (
    <CallToActionBox>
      <Section>
        <Title>Current Intervention</Title>
        <Content>
          <Icon>{interventionIcon}</Icon>
          <Text>
            <Primary>{currentIntervention}</Primary>
            <Detail>{INTERVENTION_DESCRIPTIONS[currentIntervention]}</Detail>
          </Text>
        </Content>
      </Section>
      <Section>
        <Title>Hospital Capacity</Title>
        {worstCaseCalloutData ? (
          <>
            <Content>
              <Icon>{worstCaseCalloutData.capacityIcon}</Icon>
              <Text>
                <Primary>Poor Compliance</Primary>
                <Detail>{worstCaseCalloutData.shortActionText}</Detail>
              </Text>
            </Content>
            <Content>
              <Icon>{interventionCalloutData.capacityIcon}</Icon>
              <Text>
                <Primary>Strict Compliance</Primary>
                <Detail>{interventionCalloutData.shortActionText}</Detail>
              </Text>
            </Content>
          </>
        ) : (
          <Content>
            <Icon>{interventionCalloutData.capacityIcon}</Icon>
            <Text>
              <Primary>{interventionCalloutData.label}</Primary>
              <Detail>{interventionCalloutData.shortActionText}</Detail>
            </Text>
          </Content>
        )}
      </Section>
    </CallToActionBox>
  );
};

const formatDate = date => {
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
  const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
  return `${month} ${day}`;
};

export default CallToAction;
