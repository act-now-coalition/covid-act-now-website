import React from 'react';
import { DonateButton, DonateButtonHeart } from './DonateButton';

export default {
  title: 'Building Blocks/Buttons',
  component: DonateButton,
};

export const DonatePurple = () => <DonateButton />;

export const DonateHeart = () => <DonateButtonHeart />;
