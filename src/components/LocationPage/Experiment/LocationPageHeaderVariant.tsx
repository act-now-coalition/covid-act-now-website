import React from 'react';
import LocationPageHeader from '../LocationPageHeader';
import { Level } from 'common/level';
import { Metric } from 'common/metricEnum';
import { Region } from 'common/regions';
import type { MetricValues } from 'common/models/Projections';

const LocationPageHeaderVariant: React.FC<{
  alarmLevel: Level;
  stats: MetricValues;
  onMetricClick: (metric: Metric) => void;
  onHeaderShareClick: () => void;
  onHeaderSignupClick: () => void;
  isMobile?: boolean;
  region: Region;
}> = ({
  alarmLevel,
  stats,
  onMetricClick,
  onHeaderShareClick,
  onHeaderSignupClick,
  isMobile,
  region,
}) => {
  const headerProps = {
    alarmLevel,
    stats,
    onMetricClick,
    onHeaderShareClick,
    onHeaderSignupClick,
    isMobile,
    region,
  };

  return <LocationPageHeader {...headerProps} />;
};

export default LocationPageHeaderVariant;
