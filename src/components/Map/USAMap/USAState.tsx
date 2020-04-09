import React from 'react';

const USAState = (props: {
  state: string;
  stateName: string;
  fill?: string;
  dimensions: string;
  onClickState: () => void;
}) => {
  return (
    <path
      d={props.dimensions}
      fill={props.fill}
      data-name={props.state}
      className={`${props.state} state`}
      onClick={props.onClickState}
    >
      <title>{props.stateName}</title>
    </path>
  );
};
export default USAState;
