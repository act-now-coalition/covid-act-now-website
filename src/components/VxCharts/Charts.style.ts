import styled from 'styled-components';

const axis = {
  fontFamily: "'Source Code Pro', 'Roboto', sans-serif",
  fontSize: '13px',
  fontWeight: '400',
  color: '#666',
};
const area = {
  fill: '#eee',
};

export const ChartContainer = styled.div`
  position: relative;
`;

export const Axis = styled.g`
  text {
    font-family: ${axis.fontFamily};
    font-size: ${axis.fontSize};
    font-weight: ${axis.fontWeight};
    fill: ${axis.color};
  }
  line {
    fill: ${axis.color};
  }
`;

export const LineMain = styled.g`
  line,
  path {
    stroke: ${props => props.stroke || '#000'};
    stroke-width: 4px;
    stroke-linecap: square;
  }
`;

export const LineMainDashed = styled(LineMain)`
  line,
  path {
    stroke-dasharray: 1, 6;
  }
`;

export const LineGrid = styled(LineMain)`
  line,
  path {
    stroke: '#000';
    stroke-opacity: 0.6;
    stroke-dasharray: 4, 3;
    stroke-width: 1px;
  }
`;

// Area
export const Area = styled.g`
  path {
    fill: ${props => props.fill || area.fill};
    stroke: none;
  }
`;

// Markers
export const CircleMarker = styled.circle`
  fill: ${props => props.fill};
  stroke: white;
  stroke-width: 2px;
`;

// Annotations
export const TextAnnotation = styled.text`
  font-family: ${axis.fontFamily};
  font-size: ${axis.fontSize};
  dominant-baseline: middle;
  fill: ${props => props.fill || axis.color};
`;

export const ZoneAnnotation = styled.div<{
  isActive: boolean;
  primaryColor: string;
  left: number;
  top: number;
}>`
  position: absolute;
  transform: translate(0, -50%);
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};
  font-family: ${axis.fontFamily};
  font-size: ${axis.fontSize};
  padding: 5px;
  border: solid 1px;
  border-radius: 3px;
  border-color: ${props => (props.isActive ? props.primaryColor : '#ddd')};
  color: ${props => (props.isActive ? 'white' : props.primaryColor)};
  background-color: ${props => (props.isActive ? props.primaryColor : 'white')};
`;
