import React from 'react';
import { DonateButton, DonateButtonHeart } from './DonateButton';

export default {
  title: 'Components/Buttons',
  component: DonateButton,
};

export const DonatePurple = () => <DonateButton />;

export const DonateHeart = () => <DonateButtonHeart onClick={() => {}} />;
