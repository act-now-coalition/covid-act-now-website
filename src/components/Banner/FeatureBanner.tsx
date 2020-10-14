import React, { Fragment } from 'react';
import { FeatureBannerButton } from './Banner.style';
import * as Styles from './Banner.style';
import ExternalLink from 'components/ExternalLink';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';

const Buttons = (props: { scrollTo: any }) => {
  return (
    <Fragment>
      <FeatureBannerButton
        variant="contained"
        color="primary"
        disableRipple
        disableFocusRipple
        onClick={() => {
          trackEvent(
            EventCategory.INDIGENOUS_PEOPLES_DAY,
            EventAction.CLICK,
            'View chart',
          );
          props.scrollTo();
        }}
      >
        View chart
      </FeatureBannerButton>
      <ExternalLink href="https://blog.covidactnow.org/covid-native-american-counties">
        <FeatureBannerButton
          variant="contained"
          color="primary"
          disableRipple
          disableFocusRipple
        >
          View our observations
        </FeatureBannerButton>
      </ExternalLink>
    </Fragment>
  );
};

const FeatureBannerInner: React.FC<{
  scrollTo: any;
}> = ({ scrollTo }) => {
  return (
    <Styles.FeatureBannerContainer container spacing={1}>
      <Styles.MessageContainer item sm md lg>
        For <strong>Indigenous Peoples’ Day</strong>, see COVID data for
        majority Native American communities.
      </Styles.MessageContainer>
      <Styles.ButtonContainer>
        <Buttons scrollTo={scrollTo} />
      </Styles.ButtonContainer>
    </Styles.FeatureBannerContainer>
  );
};

// TODO (Chelsi) fix the anys
const FeatureBanner = (props: { scrollTo: any }) => {
  return <FeatureBannerInner scrollTo={props.scrollTo} />;
};

export default FeatureBanner;
