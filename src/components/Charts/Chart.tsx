import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/css/highcharts.css';

const Chart = ({ options }: { options: Highcharts.Options }) => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
