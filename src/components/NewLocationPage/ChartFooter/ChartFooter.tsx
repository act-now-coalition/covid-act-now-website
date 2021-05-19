import React from 'react';

interface FooterProps {
  shareButton: any;
}

const ChartFooter: React.FC<FooterProps> = ({ shareButton }) => {
  return <>{shareButton}</>;
};

export default ChartFooter;
