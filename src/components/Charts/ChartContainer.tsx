import React from 'react';
import { localPoint } from '@vx/event';
import { Group } from '@vx/group';
import { useTooltip } from '@vx/tooltip';
import TooltipOverlayXY from './TooltipOverlayXY';
import * as Style from './Charts.style';
import { ScreenshotReady } from 'components/Screenshot';

const ChartContainer = <T extends unknown>({
  width,
  height,
  marginTop = 5,
  marginBottom = 40,
  marginLeft = 40,
  marginRight = 5,
  x,
  y,
  data,
  renderMarker,
  renderTooltip,
  children,
}: {
  width: number;
  height: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  x: (d: T) => number;
  y: (d: T) => number;
  data: T[];
  renderMarker: (d: T) => React.ReactNode;
  renderTooltip: (d: T) => React.ReactNode;
  children: React.ReactNode;
}) => {
  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const tooltip = useTooltip<T>();
  const { tooltipData, tooltipOpen, showTooltip, hideTooltip } = tooltip;

  const onMouseOver = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    d: T,
  ) => {
    // @ts-ignore - typing bug
    const coords = localPoint(event.target.ownerSVGElement, event);
    if (!coords) return;
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: d,
    });
  };

  return (
    <Style.PositionRelative>
      <svg width={width} height={height}>
        <Group left={marginLeft} top={marginTop}>
          {children}
          {tooltipOpen && tooltipData && renderMarker(tooltipData)}
          <TooltipOverlayXY<T>
            width={chartWidth}
            height={chartHeight}
            data={data}
            x={x}
            y={y}
            onMouseOver={onMouseOver}
            onMouseOut={hideTooltip}
          />
        </Group>
      </svg>
      {width > 0 && <ScreenshotReady />}
      {tooltipOpen && tooltipData && renderTooltip(tooltipData)}
    </Style.PositionRelative>
  );
};

export default ChartContainer;
