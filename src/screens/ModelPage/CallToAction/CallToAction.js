import React from 'react';
import { INTERVENTIONS, INTERVENTION_DESCRIPTIONS } from 'enums';
import { WarningIcon, CheckIcon } from 'assets/images/capacityIcons';
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
        shortActionText: `We project no overload over the next 3 months`,
        capacityIcon: (
          <CheckIcon fill={interventions.getSeriesColorForShelterInPlace()} />
        ),
      };
    } else {
      const isShelterInPlaceWorstCaseModel =
        currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE &&
        model.intervention === INTERVENTIONS.SOCIAL_DISTANCING;

      let capacityIcon;
      if (isShelterInPlaceWorstCaseModel) {
        capacityIcon = (
          <WarningIcon
            fill={interventions.getSeriesColorForSocialDistancing()}
          />
        );
      } else {
        if (model.intervention === INTERVENTIONS.LIMITED_ACTION) {
          capacityIcon = (
            <WarningIcon
              fill={interventions.getSeriesColorForLimitedAction()}
            />
          );
        } else {
          if (currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE) {
            capacityIcon = (
              <WarningIcon
                fill={interventions.getSeriesColorForShelterInPlace()}
              />
            );
          } else {
            capacityIcon = (
              <WarningIcon
                fill={interventions.getSeriesColorForSocialDistancing()}
              />
            );
          }
        }
      }

      return {
        label: `Overload projected`,
        shortActionText: `We project hospitals will become overloaded by ${formatDate(
          model.dateOverwhelmed,
        )}.`,
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
    <InterventionIcon color={interventions.getInterventionColor()} />
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
                <Primary>Lax Stay At Home</Primary>
                <Detail>{worstCaseCalloutData.shortActionText}</Detail>
              </Text>
            </Content>
            <Content>
              <Icon>{interventionCalloutData.capacityIcon}</Icon>
              <Text>
                <Primary>Strict Stay At Home</Primary>
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
