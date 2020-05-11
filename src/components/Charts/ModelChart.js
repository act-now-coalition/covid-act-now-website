import React, { useMemo } from 'react';
import _ from 'lodash';
import { dateFormat, numberFormat } from 'highcharts';
import moment from 'moment';
import Chart from './Chart';
import {
  ChartContainer,
  Wrapper,
  CondensedLegendStyled,
  CondensedLegendItemStyled,
} from './ModelChart.style';
import Outcomes from '../Outcomes/Outcomes';
import { COLORS } from 'enums';
import { formatDate } from 'utils';

const isFuture = d => d.x > new Date().valueOf();

const ModelChart = ({
  height,
  condensed,
  projections,
  forCompareModels, // true when used by CompareModels.js component.
}) => {
  const noActionDataset = projections.baseline.getDataset('hospitalizations');
  const projectedDataset = projections.projected.getDataset('hospitalizations');
  const bedsDataset = projections.primary.getDataset('beds');

  const noAction = {
    className: 'limited-action',
    name: 'If all restrictions are lifted',
    type: 'spline',
    data: noActionDataset.filter(isFuture),
    marker: {
      symbol: 'circle',
    },
    visible: !forCompareModels,
    condensedLegend: {
      bgColor: COLORS.LIMITED_ACTION,
    },
    legendIndex: 2,
  };

  const projected = {
    className: 'projected',
    name: 'Projected based on current trends',
    type: 'spline',
    data: projectedDataset.filter(isFuture),
    marker: {
      symbol: 'circle',
    },
    condensedLegend: {
      bgColor: COLORS.PROJECTED,
    },
    legendIndex: 3,
  };

  const previousEstimates = {
    className: 'hospitalizations',
    name: 'Hospitalizations',
    type: 'spline',
    data: projectedDataset.filter(d => !isFuture(d)),
    color: 'black',
    marker: {
      symbol: 'circle',
    },
    condensedLegend: {
      bgColor: 'black',
    },
    legendIndex: 1,
  };

  const availableBeds = {
    className: 'beds',
    name: 'Available hospital beds',
    type: 'spline',
    data: bedsDataset,
    marker: {
      symbol: 'circle',
    },
    condensedLegend: {
      outline: '2px dashed black',
    },
    showInLegend: false,
  };

  const options = useMemo(() => {
    const maxAvailableBeds = _.max(availableBeds.data.map(d => d.y));
    const minDate = _.min(availableBeds.data.map(d => d.x));
    const lastPreviousEstimate = _.last(
      previousEstimates.data.filter(d => !isFuture(d)),
    );
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
      },
      yAxis: {
        visible: false,
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
      series: [noAction, projected, availableBeds, previousEstimates],
      annotations: [
        {
          draggable: '',
          labelOptions: {
            backgroundColor: '#fff',
          },
          labels: [
            {
              align: 'right',
              className: 'Annotation Annotation--BedsAvailable',
              shape: 'rect',
              y: 2,
              point: {
                xAxis: 0,
                yAxis: 0,
                x: minDate,
                y: maxAvailableBeds,
              },
              style: {
                fontWeight: 'bold',
              },
              formatter: function () {
                return `${numberFormat(this.y, 0, '.', ',')} beds`;
              },
            },
          ],
          shapes: [
            {
              draggable: '',
              type: 'circle',
              x: 2,
              point: {
                xAxis: 0,
                yAxis: 0,
                ...lastPreviousEstimate,
              },
              r: 6,
            },
          ],
        },
      ],
    };
  }, [
    height,
    noAction,
    projected,
    availableBeds,
    condensed,
    previousEstimates,
  ]);

  if (condensed) {
    return (
      <ChartContainer>
        <Wrapper projections={projections}>
          <Chart options={options} />
          <CondensedLegend>
            {[previousEstimates, noAction, projected]
              .filter(series => series.visible !== false)
              .map(CondensedLegendItem)}
          </CondensedLegend>
        </Wrapper>
      </ChartContainer>
    );
  }

  let outcomesProjections = [projections.baseline, projections.projected];
  let outcomesColors = [COLORS.LIMITED_ACTION, COLORS.PROJECTED];
  return (
    <ChartContainer>
      <Wrapper projections={projections}>
        <Chart options={options} />
        <Outcomes
          title={`Predicted outcomes by ${formatDate(
            projections.projected.finalDate,
          )} (90 days from now)`}
          projections={outcomesProjections}
          colors={outcomesColors}
        />
      </Wrapper>
    </ChartContainer>
  );
};

function CondensedLegend({ children }) {
  return <CondensedLegendStyled>{children}</CondensedLegendStyled>;
}

function CondensedLegendItem({
  name,
  condensedLegend: { condensedName, bgColor, outline, darkLegendText },
}) {
  return (
    <CondensedLegendItemStyled
      bgColor={bgColor}
      outline={outline}
      darkLegendText={darkLegendText}
    >
      {condensedName || name}
    </CondensedLegendItemStyled>
  );
}

export default ModelChart;
