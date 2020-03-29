import React from 'react';
import moment from 'moment';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import { INTERVENTIONS, INTERVENTION_COLOR_MAP } from 'enums';

import {
  HeaderHighlight,
  HeaderSubCopy,
  HeaderDisclaimer,
  HeaderRule,
  HeaderTitle,
  StyledStateImageWrapper,
  StyledStateHeaderWrapper,
  StyledStateHeaderInner,
} from './StateHeader.style';

const Stateheader = ({
  location,
  locationName,
  intervention,
  interventions,
}) => {
  const interventionToModel = {
    [INTERVENTIONS.LIMITED_ACTION]: interventions.baseline,
    [INTERVENTIONS.SOCIAL_DISTANCING]:
      interventions.distancingPoorEnforcement.now,
    [INTERVENTIONS.SHELTER_IN_PLACE]: interventions.distancing.now,
  };

  const model = interventionToModel[intervention];

  const earlyDate = moment(model.dateOverwhelmed).subtract(14, 'days');
  const lateDate = moment(model.dateOverwhelmed).subtract(9, 'days');

  const buildInterventionTitle = () => {
    switch (intervention) {
      case INTERVENTIONS.LIMITED_ACTION:
      case INTERVENTIONS.SOCIAL_DISTANCING:
        return (
          <span>
            You must act now in <strong>{locationName}.</strong>
          </span>
        );
      case INTERVENTIONS.SHELTER_IN_PLACE:
        return (
          <span>
            Maintain shelter in place in <strong>{locationName}.</strong>
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
              To limit hospital overload, our projections indicate shelter in
              place must be implemented{' '}
              <HeaderHighlight color={INTERVENTION_COLOR_MAP[intervention]}>
                immediately
              </HeaderHighlight>
              .
            </HeaderSubCopy>
          );
        } else {
          return (
            <HeaderSubCopy>
              To prevent hospital overload, our projections indicate shelter in
              place must be implemented{' '}
              <HeaderHighlight color={INTERVENTION_COLOR_MAP[intervention]}>
                between {earlyDate.format('MMMM Do')} and{' '}
                {lateDate.format('MMMM Do')} at the latest
              </HeaderHighlight>
              . The only thing that matters right now is the speed of your
              response.
            </HeaderSubCopy>
          );
        }
      case INTERVENTIONS.SHELTER_IN_PLACE:
        return (
          <HeaderSubCopy>
            Avoiding hospital overload depends largely on population density and
            public cooperation. Best and worst case scenarios are shown below,
            and we’ll have projections on how things are actually going as soon
            as data becomes available.
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
        <div>
          <HeaderTitle>{buildInterventionTitle()}</HeaderTitle>
          {buildPredection()}
          <HeaderRule />
        </div>
        <div>
          <HeaderDisclaimer color="inherit" component="p" variant="subtitle2">
            These projections are intended to help make fast decisions, not
            predict the future.
          </HeaderDisclaimer>
        </div>
      </StyledStateHeaderInner>
    </StyledStateHeaderWrapper>
  );
};

export default Stateheader;
