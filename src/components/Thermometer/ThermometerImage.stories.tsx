import React from 'react';
import ThermometerImage from './ThermometerImage';
import { Level } from 'common/level';

export default {
  title: 'Components/ThermometerImage',
  component: ThermometerImage,
};

export const High = () => <ThermometerImage currentLevel={Level.HIGH} />;
export const Unknown = () => <ThermometerImage currentLevel={Level.UNKNOWN} />;
