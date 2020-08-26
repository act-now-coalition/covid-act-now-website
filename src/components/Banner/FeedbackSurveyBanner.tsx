import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Banner from './Banner';
import { SurveyButton } from './Banner.style';
import ExternalLink from 'components/ExternalLink';

const FEEDBACK_SURVEY_URL = 'https://can386399.typeform.com/to/fCLv9bzl';

export function getFeedbackSurveyUrl(source: string) {
  return `${FEEDBACK_SURVEY_URL}#source=${source}&id=${uuidv4()}`;
}

const renderButton = () => (
  <ExternalLink href={getFeedbackSurveyUrl('org')}>
    <SurveyButton
      variant="contained"
      color="primary"
      disableRipple
      disableFocusRipple
    >
      Take our survey
    </SurveyButton>
  </ExternalLink>
);

const MESSAGE = `We’re a team of volunteers working to provide you with 
 the most useful COVID information. Please help us improve by taking 
 this short survey!`;

const FeedbackSurveyBanner: React.FC = () => (
  <Banner message={MESSAGE} renderButton={renderButton} />
);

export const RedirectToFeedbackSurvey: React.FC<{ source: string }> = ({
  source,
}) => {
  useEffect(() => {
    window.location.href = getFeedbackSurveyUrl(source);
  }, [source]);
  return null;
};

export default FeedbackSurveyBanner;
