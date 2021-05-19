import React from 'react';
import ChartFooter from './ChartFooter';
import ShareButton from 'components/NewLocationPage/ShareButton/ShareButton';

export default {
  title: 'Location page redesign/Chart Footer',
  component: ChartFooter,
};

const footerText =
  'Over the last week, Texas has averaged 3,173 new confirmed cases per day (10.9 for every 100,000 residents).';
const footerLinkOrLegend = (
  <a href={'https://www.google.com'}>About this data</a>
);

export const ChartFooterExample = () => {
  return (
    <ChartFooter
      shareButton={<ShareButton onClickShare={() => {}} />}
      footerText={footerText}
      footerLinkOrLegend={footerLinkOrLegend}
    />
  );
};
