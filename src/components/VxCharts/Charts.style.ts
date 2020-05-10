import styled from 'styled-components';

// Parameters
const fontFamily = "'Source Code Pro', 'Roboto', sans-serif";
const fontWeight = 400;

const fontSize13 = '13px';
const fontSize11 = '11px';

const colorAxis = '#666';
const colorArea = '#eee';
const colorBlack = '#000';
const colorWhite = '#fff';
const greyCCC = '#ccc';
const grey333 = '#333';
const greyDDD = '#ddd';

const tooltipWidth = '160px';
const tooltipPadding = '10px';
const tooltipTextColor = '#eee';
const tooltipBorderRadius = '3px';
const tooltipBoxShadow = `3px 3px 5px ${greyCCC}`;

export const ChartContainer = styled.div`
  position: relative;
`;

export const Axis = styled.g`
  text {
    font-family: ${fontFamily};
    font-size: ${fontSize13};
    font-weight: ${fontWeight};
    fill: ${colorAxis};
  }
  line {
    fill: ${colorAxis};
  }
`;

export const LineMain = styled.g`
  line,
  path {
    stroke: ${props => props.stroke || colorBlack};
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
    stroke: ${colorBlack};
    stroke-opacity: 0.6;
    stroke-dasharray: 4, 3;
    stroke-width: 1px;
  }
`;

// Area
export const Area = styled.g`
  path {
    fill: ${props => props.fill || colorArea};
    stroke: none;
  }
`;

// Markers
export const CircleMarker = styled.circle`
  stroke: white;
  stroke-width: 2px;
`;

// Annotations
export const TextAnnotation = styled.text`
  font-family: ${fontFamily};
  font-size: ${fontSize13};
  dominant-baseline: middle;
  fill: ${props => props.fill || colorAxis};
`;

const Positioned = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};
`;

const PositionedBox = styled(Positioned)`
  padding: ${tooltipPadding};
  font-family: ${fontFamily};
  font-size: ${fontSize13};
  border-radius: ${tooltipBorderRadius};
`;

export const ZoneAnnotation = styled(PositionedBox)<{
  isActive: boolean;
  primaryColor: string;
  left: number;
  top: number;
}>`
  transform: translate(0, -50%);
  border: solid 1px;
  border-color: ${props => (props.isActive ? props.primaryColor : greyDDD)};
  color: ${props => (props.isActive ? colorWhite : props.primaryColor)};
  background-color: ${props =>
    props.isActive ? props.primaryColor : colorWhite};
`;

export const Tooltip = styled(PositionedBox)`
  transform: translate(-50%, calc(-100% - 15px));
  pointer-events: none;
  width: ${tooltipWidth};
  color: ${tooltipTextColor};
  background-color: ${grey333};
  box-shadow: ${tooltipBoxShadow};
`;

export const TooltipTitle = styled.div`
  font-size: ${fontSize11};
`;

export const TooltipBody = styled.div`
  font-size: ${fontSize13};
`;
