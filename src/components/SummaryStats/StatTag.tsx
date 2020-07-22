import React, { Fragment } from 'react';

import { BetaTag, NewIndicatorTag } from './SummaryStats.style';

const StatTag = (props: {
  isHeader?: Boolean;
  beta?: Boolean;
  newIndicator?: Boolean;
}) => {
  return (
    <Fragment>
      {props.beta && <BetaTag isHeader={props.isHeader}>Beta</BetaTag>}
      {props.newIndicator && (
        <NewIndicatorTag isHeader={props.isHeader}>
          New Indicator
        </NewIndicatorTag>
      )}
    </Fragment>
  );
};

export default StatTag;
