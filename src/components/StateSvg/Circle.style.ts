import styled from 'styled-components';

export const CircleWrapper = styled.div<{ size: number }>`
  position: relative;
  width: ${props => props.size}px;
`;

export const StateWrapper = styled.div<{ ratio: number; size: number }>`
  position: absolute;
  width: ${props => (props.ratio === 1 ? 1 : props.ratio * 0.9) * 38}px;
  height: ${props => (props.ratio === 1 ? 1 : props.ratio * 0.9) * 38}px;
  left: calc(
    ${props => props.size - (props.ratio === 1 ? 1 : props.ratio * 0.9) * 38}px /
      2
  );
  top: calc(
    ${props => props.size - (props.ratio === 1 ? 1 : props.ratio * 0.9) * 38}px /
      2
  );

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

export const ActionWrapper = styled.div`
  position: absolute;
  height: 24px;
  width: 24px;
  right: 0;
  bottom: 0;
`;
