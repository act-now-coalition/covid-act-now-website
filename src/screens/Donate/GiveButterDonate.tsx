import React from 'react';
import GiveButterEmbed from 'screens/Donate/GiveButterEmbed';
import Donate from './utils';

const GiveButterEmbedComponent: React.ReactNode = (
  <GiveButterEmbed embedUrl="https://givebutter.com/embed/c/VT7Yvu" />
);

const GiveButterDonate: React.FC = () => (
  <Donate embedComponent={GiveButterEmbedComponent} />
);

export default GiveButterDonate;
