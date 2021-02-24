import React from 'react';
import Thermometer, { ThermometerBox } from './index';
import { COLOR_MAP } from 'common/colors';
import { getMetricDefinition } from 'common/metric';
import { Metric } from 'common/metricEnum';
import NewThermometer from './NewThermometer';
import { Level } from 'common/level';

export default {
  title: 'Shared Components/Thermometer',
  component: Thermometer,
};

const items = [
  {
    title: `High`,
    description: 'Over 5',
    color: COLOR_MAP.RED.BASE,
    roundTop: true,
    roundBottom: false,
  },
  {
    title: 'Medium',
    description: 'Between 1 and 5',
    color: COLOR_MAP.ORANGE.BASE,
    roundTop: false,
    roundBottom: false,
  },
  {
    title: 'Low',
    description: 'Under 1',
    color: COLOR_MAP.GREEN.BASE,
    roundTop: false,
    roundBottom: true,
  },
];

export const CustomLevels = () => {
  return <Thermometer items={items} />;
};

export const Boxed = () => {
  return (
    <ThermometerBox>
      <Thermometer items={items} />
    </ThermometerBox>
  );
};

function renderMetricThermometer(metric: Metric) {
  const metricDefinition = getMetricDefinition(metric);
  return metricDefinition.renderThermometer();
}

export const CaseIncidence = () => renderMetricThermometer(Metric.CASE_DENSITY);

export const GrowthRate = () =>
  renderMetricThermometer(Metric.CASE_GROWTH_RATE);

export const Vaccinations = () => renderMetricThermometer(Metric.VACCINATIONS);

export const HospitalUsage = () =>
  renderMetricThermometer(Metric.HOSPITAL_USAGE);

export const PositiveTests = () =>
  renderMetricThermometer(Metric.POSITIVE_TESTS);

export const SvgThermometer = () => {
  return <NewThermometer currentLevel={Level.MEDIUM} />;
};
