import React, { Fragment } from 'react';

import { BetaTag, NewIndicatorTag } from './SummaryStats.style';

// TODO (Chelsi): make copy a prop/make this more resuable
const StatTag = (props: {
  isHeader?: boolean;
  beta?: boolean;
  newIndicator?: boolean;
  featured?: boolean;
}) => {
  const blueTagCopy = props.newIndicator ? 'New Indicator' : 'Featured';
  return (
    <Fragment>
      {props.beta && <BetaTag $isHeader={props.isHeader}>Beta</BetaTag>}
      {(props.newIndicator || props.featured) && (
        <NewIndicatorTag $isHeader={props.isHeader}>
          {blueTagCopy}
        </NewIndicatorTag>
      )}
    </Fragment>
  );
};

export default StatTag;
