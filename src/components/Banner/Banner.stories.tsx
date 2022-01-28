import React from 'react';
import {
  DonationBanner,
  SpringSurgeBanner,
  VaccinationsBanner,
  Vaccinations100M,
  VoteBanner,
  FeatureBanner,
  ThirdWaveBanner,
  BoosterBanner,
  FeedbackSurveyBanner,
} from './index';

export default {
  title: 'Shared Components/Banner',
  component: DonationBanner,
};

export const Donation = () => <DonationBanner />;

export const SummerSurge = () => <SpringSurgeBanner />;

export const Vaccinations = () => <VaccinationsBanner />;

export const Vaccinations100 = () => <Vaccinations100M />;

export const Vote = () => <VoteBanner />;

export const Feature = () => <FeatureBanner scrollTo={'/'} />;

export const ThirdWave = () => <ThirdWaveBanner />;

export const Booster = () => <BoosterBanner />;

export const Feedback = () => <FeedbackSurveyBanner />;
