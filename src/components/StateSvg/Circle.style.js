import styled from 'styled-components';

export const CircleWrapper = styled.div`
  position: relative;
  width: ${props => props.size}px;
`;

export const StateWrapper = styled.div`
  position: absolute;
  width: ${props => (props.ratio === 1 ? 1 : props.ratio * .9) * 38}px;
  height: ${props => (props.ratio === 1 ? 1 : props.ratio * .9) * 38}px;
  left: calc(${props => (props.size - (props.ratio === 1 ? 1 : props.ratio * .9) * 38)}px / 2);
  top: calc(${props => (props.size - (props.ratio === 1 ? 1 : props.ratio * .9) * 38)}px / 2);

  svg {
    width: 100%;
    height: 100%;

    path,
    g {
      opacity: 1;
      fill: white;
    }
  }
`;
