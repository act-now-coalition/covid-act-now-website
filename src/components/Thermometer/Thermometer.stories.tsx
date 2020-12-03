import React from 'react';
import Thermometer from './Thermometer';
import { COLOR_MAP } from 'common/colors';
import { getMetricDefinition, Metric } from 'common/metric';

export default {
  title: 'Shared Components/Thermometer',
  component: Thermometer,
};

export const CustomLevels = () => {
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
  return <Thermometer items={items} />;
};

function renderMetricThermometer(metric: Metric) {
  const metricDefinition = getMetricDefinition(metric);
  return metricDefinition.renderThermometer();
}

export const CaseIncidence = () => renderMetricThermometer(Metric.CASE_DENSITY);

export const GrowthRate = () =>
  renderMetricThermometer(Metric.CASE_GROWTH_RATE);

export const ContactTracing = () =>
  renderMetricThermometer(Metric.CONTACT_TRACING);

export const HospitalUsage = () =>
  renderMetricThermometer(Metric.HOSPITAL_USAGE);

export const PositiveTests = () =>
  renderMetricThermometer(Metric.POSITIVE_TESTS);
