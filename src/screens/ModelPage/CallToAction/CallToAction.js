import React from 'react';
import { INTERVENTIONS } from 'enums';
import Callout from 'components/Callout/Callout';

const LAST_DATES_CALLOUT_COLORS = {
  // Array is [fill color, border color]
  [INTERVENTIONS.LIMITED_ACTION]: ['rgba(255, 0, 0, 0.0784)', 'red'],
  [INTERVENTIONS.SOCIAL_DISTANCING]: ['rgba(255, 255, 0, 0.0784)', 'yellow'],
  [INTERVENTIONS.SHELTER_IN_PLACE]: ['rgba(0, 255, 0, 0.0784)', 'green'],
};

const DAYS = 1000 * 60 * 60 * 24;
const ONE_HUNDRED_DAYS = 100 * DAYS;

const CallToAction = ({ interventions, currentIntervention }) => {
  const interventionToModel = {
    [INTERVENTIONS.LIMITED_ACTION]: interventions.baseline,
    [INTERVENTIONS.SOCIAL_DISTANCING]:
      interventions.distancingPoorEnforcement.now,
    [INTERVENTIONS.SHELTER_IN_PLACE]: interventions.distancing.now,
  };

  const model = interventionToModel[currentIntervention];

  let actionText, actionDateRange;
  if (currentIntervention === INTERVENTIONS.SHELTER_IN_PLACE) {
    actionText = `${currentIntervention} is projected to reduce hospital overload over the next 3 months`;
  } else if (
    !model.dateOverwhelmed ||
    model.dateOverwhelmed - new Date() > ONE_HUNDRED_DAYS
  ) {
    actionText = `${currentIntervention} projected to successfully delay hospital overload by greater than 3 months.`;
  } else {
    actionText = `To prevent hospital overload, ${suggestedIntervention()} must be implemented by:`;
    const earlyDate = new Date(model.dateOverwhelmed.getTime() - 14 * DAYS);
    const lateDate = new Date(model.dateOverwhelmed.getTime() - 9 * DAYS);
    actionDateRange = (
      <div style={{ fontWeight: "bold", marginTop: "1.2rem" }}>
        {formatDate(earlyDate)} to {formatDate(lateDate)}
      </div>
    );
  }

  const [calloutFillColor, calloutStrokeColor] = LAST_DATES_CALLOUT_COLORS[
    currentIntervention
  ];

  return (
    <Callout
      borderColor={calloutStrokeColor}
      backgroundColor={calloutFillColor}
    >
      <div style={{ fontWeight: 'normal' }}>{actionText}</div>
      {actionDateRange}
    </Callout>
  );
};

const suggestedIntervention = intervention => {
  switch (intervention) {
    case INTERVENTIONS.LIMITED_ACTION:
      return INTERVENTIONS.SHELTER_IN_PLACE;
    case INTERVENTIONS.SOCIAL_DISTANCING:
      return INTERVENTIONS.SHELTER_IN_PLACE;
    default:
      return 'stricter intervention';
  }
};

const formatDate = date => {
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
  return `${month} ${day}`;
};

export default CallToAction;
