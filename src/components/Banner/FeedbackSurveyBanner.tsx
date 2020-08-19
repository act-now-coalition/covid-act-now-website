import React from 'react';
import Banner from './Banner';
import { SurveyButton } from './Banner.style';

const renderButton = () => (
  // TODO(pablo): Update with the real link
  <SurveyButton
    href="https://can386399.typeform.com/to/fCLv9bzl#source=org"
    variant="contained"
    color="primary"
    disableRipple
    disableFocusRipple
  >
    Take our survey
  </SurveyButton>
);

const MESSAGE = `We’re a team of volunteers working to provide you the most
 useful COVID information. Help us improve by taking a survey!
`;

const FeedbackSurveyBanner: React.FC = () => (
  <Banner message={MESSAGE} renderButton={renderButton} />
);

export default FeedbackSurveyBanner;
