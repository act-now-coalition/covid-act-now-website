import React from 'react';
import {
  StyledNoResultsWrapper,
  StyledNoResults,
} from './NoCountyDetail.style';
import { STATES } from 'common';
import { useHistory } from 'react-router-dom';
import { getFormattedCountyName } from 'common/utils';

const NoCountyDetail = (props: { stateId: string; countyId: string }) => {
  const history = useHistory();

  // @ts-ignore: States is .js, but this is valid
  const stateName = STATES[props.stateId];
  const countyName = getFormattedCountyName(props.stateId, props.countyId);

  const goTo = (route: string) => {
    history.push(route);
  };

  return (
    <div>
      <StyledNoResultsWrapper>
        <StyledNoResults>
          <div>
            We either weren't able to get data for {countyName}, or no cases
            have yet been confirmed.
          </div>
          <div>
            We’re unable to produce our model for this county until we have
            data. Check back soon.
          </div>
          <div style={{ marginTop: '1rem' }}>
            View projections for{' '}
            <span onClick={() => goTo('/us/' + props.stateId.toLowerCase())}>
              {stateName}
            </span>
          </div>
        </StyledNoResults>
      </StyledNoResultsWrapper>
    </div>
  );
};

export default NoCountyDetail;
