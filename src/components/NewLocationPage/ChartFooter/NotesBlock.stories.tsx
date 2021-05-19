import React from 'react';
import ChartFooter from './ChartFooter';
import ShareButton from 'components/NewLocationPage/ShareButton/ShareButton';

export default {
  title: 'Location page redesign/Chart Footer',
  component: ChartFooter,
};

export const ChartFooterExample = () => {
  return <ChartFooter shareButton={<ShareButton onClickShare={() => {}} />} />;
};
