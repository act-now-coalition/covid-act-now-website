import React from 'react';
import moment from 'moment';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import { INTERVENTIONS, INTERVENTION_COLOR_MAP } from 'enums';

import {
  HeaderHighlight,
  HeaderSubCopy,
  HeaderTitle,
  StyledStateImageWrapper,
  StyledStateCopyWrapper,
  StyledStateHeaderWrapper,
  StyledStateHeaderInner,
} from './StateHeader.style';

const Stateheader = ({
  location,
  locationName,
  countyName,
  intervention,
  interventions,
}) => {
  const interventionToModel = {
    [INTERVENTIONS.LIMITED_ACTION]: interventions.baseline,
    [INTERVENTIONS.SOCIAL_DISTANCING]:
      interventions.distancingPoorEnforcement.now,
    [INTERVENTIONS.SHELTER_IN_PLACE]: interventions.distancing.now,
  };

  // hardcoded new york
  if (
    locationName === 'New York' &&
    [
      'Kings County',
      'Queens County',
      'Bronx County',
      'Richmond County',
    ].indexOf(countyName) > -1
  ) {
    countyName = 'New York';
  }

  const model = interventionToModel[intervention];

  const earlyDate = moment(model.dateOverwhelmed).subtract(14, 'days');
  const lateDate = moment(model.dateOverwhelmed).subtract(9, 'days');
  const displayName = countyName ? (
    <>
      {' '}
      {countyName}, <a href={`/state/${location}`}>{locationName}</a>
    </>
  ) : (
    locationName
  );

  const buildInterventionTitle = () => {
    switch (intervention) {
      case INTERVENTIONS.LIMITED_ACTION:
      case INTERVENTIONS.SOCIAL_DISTANCING:
        return (
          <span>
            You must act now in <strong>{displayName}</strong>
          </span>
        );
      case INTERVENTIONS.SHELTER_IN_PLACE:
        return (
          <span>
            Keep staying at home in <strong>{displayName}.</strong>
          </span>
        );
      default:
    }
  };

  const buildPredection = () => {
    switch (intervention) {
      case INTERVENTIONS.LIMITED_ACTION:
      case INTERVENTIONS.SOCIAL_DISTANCING:
        if (earlyDate.isBefore(moment())) {
          return (
            <HeaderSubCopy>
              To limit hospital overload, our projections indicate a Stay at
              Home order must be implemented{' '}
              <HeaderHighlight color={INTERVENTION_COLOR_MAP[intervention]}>
                immediately
              </HeaderHighlight>
              . The sooner you act, the more lives you save.
            </HeaderSubCopy>
          );
        } else {
          return (
            <HeaderSubCopy>
              To prevent hospital overload, our projections indicate a Stay at
              Home order must be implemented{' '}
              <HeaderHighlight color={INTERVENTION_COLOR_MAP[intervention]}>
                between {earlyDate.format('MMMM Do')} and{' '}
                {lateDate.format('MMMM Do')} at the latest
              </HeaderHighlight>
              . The sooner you act, the more lives you save.
            </HeaderSubCopy>
          );
        }
      case INTERVENTIONS.SHELTER_IN_PLACE:
        return (
          <HeaderSubCopy>
            Avoiding hospital overload heavily depends on population density and
            public cooperation. Best and worst case scenarios are shown below,
            and we’ll update our projections as soon as more data becomes
            available.
          </HeaderSubCopy>
        );
      default:
    }
  };

  return (
    <StyledStateHeaderWrapper>
      <StyledStateHeaderInner>
        <StyledStateImageWrapper>
          <StateCircleSvg
            actionBackgroundFill={'#F2F2F2'}
            state={location}
            intervention={intervention}
            hasAction={true}
          />
        </StyledStateImageWrapper>
        <StyledStateCopyWrapper>
          <div>
            <HeaderTitle>{buildInterventionTitle()}</HeaderTitle>
            {buildPredection()}
          </div>
        </StyledStateCopyWrapper>
      </StyledStateHeaderInner>
    </StyledStateHeaderWrapper>
  );
};

export default Stateheader;
