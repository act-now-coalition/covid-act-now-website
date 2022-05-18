import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Banner from './Banner';
import { ContainedButton } from './Banner.style';
import ExternalLink from 'components/ExternalLink';

const FEEDBACK_SURVEY_URL = 'https://form.typeform.com/to/BfG82tPw';

export function getFeedbackSurveyUrl(source: string) {
  return `${FEEDBACK_SURVEY_URL}#source=${source}&id=${uuidv4()}`;
}

const renderButton = () => (
  <ExternalLink href={getFeedbackSurveyUrl('org')}>
    <ContainedButton color="primary">Take our survey</ContainedButton>
  </ExternalLink>
);

const MESSAGE = `Our team is working to provide you with the most useful COVID information. Please help us improve by taking this short survey!`;

const FeedbackSurveyBanner: React.FC = () => (
  <Banner message={MESSAGE} renderButton={renderButton} />
);

export default FeedbackSurveyBanner;
