import React, { Fragment } from 'react';

import { BetaTag, NewIndicatorTag } from './SummaryStats.style';

const StatTag = (props: {
  isHeader?: boolean;
  beta?: boolean;
  newIndicator?: boolean;
}) => {
  return (
    <Fragment>
      {props.beta && <BetaTag $isHeader={props.isHeader}>Beta</BetaTag>}
      {props.newIndicator && (
        <NewIndicatorTag $isHeader={props.isHeader}>
          New Indicator
        </NewIndicatorTag>
      )}
    </Fragment>
  );
};

export default StatTag;
