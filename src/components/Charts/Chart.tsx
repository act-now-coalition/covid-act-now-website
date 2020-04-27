import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartAnnotations from 'highcharts/modules/annotations';
import 'highcharts/css/highcharts.css';

// Required for the area range chart and annotations
HighchartAnnotations(Highcharts);
HighchartsMore(Highcharts);

const Chart = ({ options }: { options: Highcharts.Options }) => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
