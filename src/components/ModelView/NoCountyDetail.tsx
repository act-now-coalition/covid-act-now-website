import React from 'react';
import _ from 'lodash';
import {
  StyledNoResultsWrapper,
  StyledNoResults,
} from './NoCountyDetail.style';
import { STATES } from 'enums';
import US_STATE_DATASET from '../MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import { useHistory } from 'react-router-dom';

const NoCountyDetail = (props: { stateId: string; countyId: string }) => {
  const history = useHistory();

  // @ts-ignore: States is .js, but this is valid
  const stateName = STATES[stateId];

  const { county, state_code } = _.find(
    // @ts-ignore: US_STATE_DATASET is .js, but this is valid
    US_STATE_DATASET.state_county_map_dataset[props.stateId].county_dataset,
    ['county_url_name', props.countyId],
  );

  const goTo = (route: string) => {
    history.push(route);
  };

  return (
    <div>
      <StyledNoResultsWrapper>
        <StyledNoResults>
          <div>
            We either weren't able to get data for {county}, {state_code}, or no
            cases have yet been confirmed.
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
