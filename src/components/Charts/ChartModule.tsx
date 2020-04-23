import React, { useMemo } from 'react';
import { dateFormat } from 'highcharts';
import moment from 'moment';
import Chart from './Chart';

import {
  ChartContainer,
  Wrapper,
  CondensedLegendStyled,
  CondensedLegendItemStyled,
} from './ChartModule.style';


const ChartModule = ({
  height,
  series,
  condensed,
  forCompareModels, // true when used by CompareInterventions.js component.
  children,
}) => {
  // We use the inferred projection if supported, otherwise the worst case for the currently active intervention

  const options = useMemo(() => {
    return {
      chart: {
        animation: false,
        styledMode: true,
        height: height || '600',
        spacing: [8, 0, condensed ? 12 : 32, 0],
      },
      title: {
        text: undefined,
      },
      subtitle: {
        // text: subtitle,
        text: undefined,
      },
      xAxis: {
        type: 'datetime',
        step: 7,
        labels: {
          useHTML: true,
          rotation: 0,
          formatter: function () {
            return dateFormat('%b %e', this.value);
          },
        },
        plotLines: [
          {
            value: Date.now(),
            className: 'today',
            zIndex: 10,
            label: {
              formatter: function () {
                return `<div class="custom-plot-label">Today</div>`;
              },
              rotation: 0,
              useHTML: true,
              x: 1,
              y: 96,
            },
          },
        ],
      },
      yAxis: {
        title: {
          text: undefined,
        },
        labels: {
          useHTML: true,
          x: 48,
          formatter: function () {
            return this.value === 0
              ? ''
              : this.axis.defaultLabelFormatter.call(this);
          },
        },
      },
      tooltip: {
        formatter: function () {
          const date = moment(this.x).format('MMMM D');
          const beds = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          if (this.series.userOptions.name === availableBeds.name) {
            return `<b>${beds}</b> expected beds <br/> available on <b>${date}</b>`;
          }
          return `<b>${beds}</b> hospitalizations <br/> expected by <b>${date}</b>`;
        },
        backgroundColor: null,
        borderWidth: 0,
        shadow: false,
        useHTML: true,
        style: {
          padding: 0,
        },
      },
      legend: {
        useHTML: true,
        margin: 32,
        symbolPadding: 8,
        itemMarginBottom: 8,
        ...(condensed ? { enabled: false } : {}),
      },
      plotOptions: {
        series: {
          animation: false,
          marker: {
            enabled: false,
          },
        },
        area: {
          animation: false,
          marker: {
            enabled: false,
          },
        },
      },
      series: series,
    };
  }, [
    height,
    series,
  ]);

  return (
    <ChartContainer>
      <Wrapper>
        <Chart options={options} />
        {children}
      </Wrapper>
    </ChartContainer>
  );
};

export default ChartModule;
