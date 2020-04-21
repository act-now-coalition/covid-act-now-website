import React from 'react';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import { COLORS } from 'enums';
import { INTERVENTIONS } from 'enums/interventions';
import { COLOR_MAP } from 'enums/interventions';
import { useEmbed } from 'utils/hooks';
import moment from 'moment';

import {
  HeaderHighlight,
  HeaderSubCopy,
  HeaderTitle,
  StyledStateImageWrapper,
  StyledStateCopyWrapper,
  StyledLocationPageHeaderWrapper,
  StyledLocationPageHeaderInner,
} from './LocationPageHeader.style';

function InterventionTitleForShelterInPlace({ projections, displayName }) {
  let title = <span>Keep staying at home in {displayName}</span>;

  if (projections.getAlarmLevelColor() === COLOR_MAP.ORANGE.BASE) {
    title = <span>Keep staying at home in {displayName}</span>;
  }

  if (projections.getAlarmLevelColor() === COLOR_MAP.RED.BASE) {
    title = <span>More aggressive action needed in {displayName}</span>;
  }

  return title;
}
function LocationPageHeading({ projections }) {
  const { isEmbed } = useEmbed();

  const displayName = projections.countyName ? (
    <>
      {projections.countyName},{' '}
      <a
        href={`${
          isEmbed ? '/embed' : ''
        }/us/${projections.stateCode.toLowerCase()}`}
      >
        {projections.stateName}
      </a>
    </>
  ) : (
    <span>{projections.stateName}</span>
  );

  const defaultActNowTitle = <span>You must act now in {displayName}</span>;

  switch (projections.stateIntervention) {
    case INTERVENTIONS.LIMITED_ACTION:
    case INTERVENTIONS.SOCIAL_DISTANCING:
      return defaultActNowTitle;
    case INTERVENTIONS.SHELTER_IN_PLACE:
      return (
        <InterventionTitleForShelterInPlace
          projections={projections}
          displayName={displayName}
        />
      );
    default:
  }
}

function LocationSummary({ projections }) {
  switch (projections.stateIntervention) {
    case INTERVENTIONS.LIMITED_ACTION:
    case INTERVENTIONS.SOCIAL_DISTANCING:
      return (
        <InterventionPredictionForLimitedActionAndSocialDistancing
          projections={projections}
        />
      );
    case INTERVENTIONS.SHELTER_IN_PLACE:
      return (
        <InterventionPredictionForShelterInPlace projections={projections} />
      );
    default:
      return '';
  }
}

function InterventionPredictionForLimitedActionAndSocialDistancing({
  projections,
}) {
  const earlyDate = moment(
    projections.currentInterventionModel.dateOverwhelmed,
  ).subtract(14, 'days');

  const lateDate = moment(
    projections.currentInterventionModel.dateOverwhelmed,
  ).subtract(9, 'days');

  let predictionText = (
    <span>
      Avoiding hospital overload depends on aggressive government interventions
      and the public taking COVID seriously. Projections will update as more
      data becomes available.
    </span>
  );

  if (projections.currentInterventionModel.dateOverwhelmed) {
    predictionText = (
      <span>
        To prevent hospital overload, our projections indicate a Stay at Home
        order must be implemented between{' '}
        <strong>{earlyDate.format('MMMM Do')}</strong> and{' '}
        <strong>{lateDate.format('MMMM Do')}</strong> at the latest. The sooner
        you act, the more lives you save.
      </span>
    );

    if (earlyDate.isBefore(moment())) {
      predictionText = (
        <span>
          To prevent hospital overload, our projections indicate a Stay at Home
          order must be implemented immediately. The sooner you act, the more
          lives you save.
        </span>
      );
    }
  }

  return <HeaderSubCopy>{predictionText}</HeaderSubCopy>;
}

function InterventionPredictionForShelterInPlace({ projections }) {
  let predictionText =
    'Things look good, keep it up! Assuming stay-at-home interventions remain in place, hospitals are not projected to become overloaded. Check back — projections update every 3 days with the most recent data.';

  if (projections.getAlarmLevelColor() === COLOR_MAP.ORANGE.BASE) {
    predictionText =
      'Things look okay. Assuming stay-at-home interventions remain in place, projections show low-to-moderate probability of hospital overload in the next two months. Check back — projections update every 3 days with the most recent data.';
  }

  if (projections.getAlarmLevelColor() === COLOR_MAP.RED.BASE) {
    predictionText =
      'Be careful. Even with stay-at-home interventions in place, our projections show risk of hospital overload in your area. More action is needed to help flatten the curve. Check back — projections update every 3 days with the most recent data.';
  }

  return <HeaderSubCopy>{predictionText}</HeaderSubCopy>;
}

const LocationPageHeader = ({ projections }) => {
  const { isEmbed } = useEmbed();

  return (
    <StyledLocationPageHeaderWrapper condensed={isEmbed}>
      <StyledLocationPageHeaderInner condensed={isEmbed}>
        <StyledStateImageWrapper>
          <StateCircleSvg
            actionBackgroundFill={COLORS.LIGHTGRAY}
            state={projections.stateCode}
            fillColor={projections.getAlarmLevelColor()}
            hasAction={true}
          />
        </StyledStateImageWrapper>
        <StyledStateCopyWrapper>
          <div>
            <HeaderTitle>
              <HeaderHighlight color={projections.getAlarmLevelColor()}>
                <LocationPageHeading projections={projections} />
              </HeaderHighlight>
            </HeaderTitle>
            {!isEmbed ? <LocationSummary projections={projections} /> : ''}
          </div>
        </StyledStateCopyWrapper>
      </StyledLocationPageHeaderInner>
    </StyledLocationPageHeaderWrapper>
  );
};

export default LocationPageHeader;
