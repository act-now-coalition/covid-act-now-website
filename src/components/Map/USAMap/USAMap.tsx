import React from 'react';
import data from './data/usa-map-dimensions';
import USAState from './USAState';

type Props = {
  onClick: (stateAbbreviation: string) => void;
  width?: number;
  height?: number;
  defaultFill?: string;
  customize?: Record<
    string,
    { fill?: string; clickHandler?: (stateAbbreviation: string) => void }
  >;
};

export default class USAMap extends React.Component<Props> {
  static defaultProps = {
    onClick: () => {},
    width: 959,
    height: 593,
    defaultFill: '#D3D3D3',
    customize: {},
  };

  clickHandler = (stateAbbreviation: string) => {
    this.props.onClick(stateAbbreviation);
  };

  fillStateColor = (state: string) => {
    if (
      this.props.customize &&
      this.props.customize[state] &&
      this.props.customize[state].fill
    ) {
      return this.props.customize[state].fill;
    }

    return this.props.defaultFill;
  };

  stateClickHandler = (state: string) => {
    if (
      this.props.customize &&
      this.props.customize[state] &&
      this.props.customize[state].clickHandler
    ) {
      return this.props.customize[state].clickHandler!;
    }
    return this.clickHandler;
  };

  buildPaths = () => {
    let paths = [];
    for (let stateKey in data) {
      const path = (
        <USAState
          key={stateKey}
          stateName={data[stateKey as keyof typeof data].name}
          dimensions={data[stateKey as keyof typeof data]['dimensions']}
          state={stateKey}
          fill={this.fillStateColor(stateKey)}
          // @ts-ignore Bug: USAState doesn't pass in the state name!
          onClickState={this.stateClickHandler(stateKey)}
        />
      );
      paths.push(path);
    }
    return paths;
  };

  render() {
    return (
      <svg
        className="us-state-map"
        xmlns="http://www.w3.org/2000/svg"
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 959 593"
      >
        <g className="outlines">
          {this.buildPaths()}
          <g className="DC state">
            <path
              className="DC1"
              fill={this.fillStateColor('DC1')}
              d="M801.8,253.8 l-1.1-1.6 -1-0.8 1.1-1.6 2.2,1.5z"
            />
            <circle
              className="DC2"
              // @ts-ignore Bug: This won't pass in the state name!
              onClick={this.stateClickHandler('DC')}
              data-name={'DC'}
              fill={this.fillStateColor('DC')}
              stroke="#FFFFFF"
              strokeWidth="1.5"
              cx="801.3"
              cy="251.8"
              r="5"
              opacity="1"
            />
          </g>
        </g>
      </svg>
    );
  }
}
