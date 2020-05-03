import React from 'react';
import { RegionChart } from '../components/VxCharts';

export default {
  title: 'RegionChart',
  component: RegionChart,
};

export const RegionChartRt = () => {
  const data = [
    { date: '2020-03-05', rt: 1.61, st: 0.5 },
    { date: '2020-03-12', rt: 1.62, st: 0.4 },
    { date: '2020-03-19', rt: 1.47, st: 0.3 },
    { date: '2020-03-26', rt: 1.25, st: 0.2 },
    { date: '2020-04-02', rt: 1.12, st: 0.16 },
    { date: '2020-04-09', rt: 0.81, st: 0.09 },
    { date: '2020-04-16', rt: 1.01, st: 0.12 },
    { date: '2020-04-23', rt: 1.04, st: 0.15 },
  ];
  return <RegionChart data={data} x={d => new Date(d.date)} y={d => d.rt} />;
};
