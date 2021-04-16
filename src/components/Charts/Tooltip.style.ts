import styled from 'styled-components';

/** Gets the chart palette based on the current theme. */
function palette(props: any) {
  return props.theme.palette.chart;
}

const triangleWidth = '7px';
const triangleHeight = '6px';

export const Tooltip = styled.div`
  position: absolute;
  pointer-events: none;
  transform: translate(-50%, calc(-100% - 20px));
  width: 220px;
  padding: 12px;
  border-radius: 4px;
  background-color: ${props => palette(props).tooltip.background};
  box-shadow: 2px 2px 6px ${props => palette(props).tooltip.shadow};
  cursor: default;
`;

export const TooltipArrow = styled(Tooltip)`
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
  }
`;

export const TooltipArrowDown = styled(TooltipArrow)`
  &:after {
    border-left: ${triangleWidth} solid transparent;
    border-right: ${triangleWidth} solid transparent;
    border-top: ${triangleHeight} solid
      ${props => palette(props).tooltip.background};
    top: 100%;
    left: calc(50% - ${triangleWidth});
  }
`;

export const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: ${props => palette(props).tooltip.textMuted};
  margin-bottom: 8px;
`;

export const Subtitle = styled(Title)`
  margin-bottom: 0;
`;

export const Body = styled.div`
  font-family: Source Code Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 19px;
  color: ${props => palette(props).tooltip.text};
`;

export const BodySmall = styled(Body)`
  font-family: Roboto;
  margin-top: 4px;
  font-weight: normal;
  font-size: 11px;
`;

export const BodyMuted = styled(Body)`
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  color: ${props => palette(props).tooltip.textMuted};
`;

export const SubText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  color: ${props => palette(props).tooltip.text};
  margin-top: 8px;
`;
