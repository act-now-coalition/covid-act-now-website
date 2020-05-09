import styled from 'styled-components';

const axis = {
  fontFamily: "'Source Code Pro', 'Roboto', sans-serif",
  fontSize: '13px',
  fontWeight: '400',
  color: '#666',
};

export const ChartContainer = styled.div`
  position: relative;
`;

export const ChartAxis = styled.g`
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
  stroke: ${props => props.stroke || '#000'};
  stroke-width: 4px;
  stroke-linecap: square;
`;

export const LineGrid = styled(LineMain)`
  stroke: '#000';
  stroke-opacity: 0.6;
  stroke-dasharray: 4, 3;
  stroke-width: 1px;
`;

export const LineMainDashed = styled(LineMain)`
  stroke-dasharray: 1, 6;
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
  fill: ${axis.color};
`;
