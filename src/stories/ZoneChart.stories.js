import React from 'react';
import Chart from '../components/Charts/Chart';
import { ZoneChartWrapper } from '../components/Charts/ZoneChart.style';
import {
  optionsRt,
  optionsPositiveTests,
  optionsHospitalUsage,
  parseDate,
} from '../components/Charts/zoneUtils';

export default {
  title: 'ZoneChart',
  component: Chart,
};

const endDate = new Date('2020-05-15');

export const GrowthRateRt = () => {
  const formatRt = d => ({
    x: parseDate(d.date),
    y: d.rt,
    low: d.rt - d.st,
    hi: d.rt + d.st,
  });
  const data = [
    { date: '2020-03-05', rt: 1.61, st: 0.5 },
    { date: '2020-03-12', rt: 1.62, st: 0.4 },
    { date: '2020-03-19', rt: 1.47, st: 0.3 },
    { date: '2020-03-26', rt: 1.25, st: 0.2 },
    { date: '2020-04-02', rt: 1.12, st: 0.16 },
    { date: '2020-04-09', rt: 0.81, st: 0.09 },
    { date: '2020-04-16', rt: 1.01, st: 0.12 },
    { date: '2020-04-23', rt: 1.04, st: 0.15 },
  ].map(formatRt);

  return (
    <ZoneChartWrapper>
      <Chart options={optionsRt(data, endDate)} />
    </ZoneChartWrapper>
  );
};

export const PositiveTests = () => {
  const formatPositiveTests = d => ({ x: parseDate(d.date), y: d.rate });
  const data = [
    { date: '2020-03-05', rate: 0.16 },
    { date: '2020-03-12', rate: 0.15 },
    { date: '2020-03-19', rate: 0.1 },
    { date: '2020-03-26', rate: 0.07 },
    { date: '2020-04-02', rate: 0.02 },
    { date: '2020-04-09', rate: 0.015 },
    { date: '2020-04-16', rate: 0.009 },
    { date: '2020-04-23', rate: 0.008 },
  ].map(formatPositiveTests);

  return (
    <ZoneChartWrapper>
      <Chart options={optionsPositiveTests(data, endDate)} />
    </ZoneChartWrapper>
  );
};

export const HospitalUsage = () => {
  const formatUsage = d => ({ x: parseDate(d.date), y: d.usage });
  const data = [
    { date: '2020-03-05', usage: 1.16 },
    { date: '2020-03-12', usage: 0.95 },
    { date: '2020-03-19', usage: 0.87 },
    { date: '2020-03-26', usage: 0.7 },
    { date: '2020-04-02', usage: 0.62 },
    { date: '2020-04-09', usage: 0.25 },
    { date: '2020-04-16', usage: 0.15 },
    { date: '2020-04-23', usage: 0.11 },
  ].map(formatUsage);

  return (
    <ZoneChartWrapper>
      <Chart options={optionsHospitalUsage(data, endDate)} />
    </ZoneChartWrapper>
  );
};
