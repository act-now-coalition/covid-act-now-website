import React from 'react';
import {
  DonationBanner,
  SpringSurgeBanner,
  VaccinationsBanner,
  Vaccinations100M,
} from './index';

export default {
  title: 'Shared Components/Banner',
  component: DonationBanner,
};

export const Donation = () => <DonationBanner />;

export const SummerSurge = () => <SpringSurgeBanner />;

export const Vaccinations = () => <VaccinationsBanner />;

export const Vaccinations100 = () => <Vaccinations100M />;
