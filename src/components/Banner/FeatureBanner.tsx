import React, { Fragment } from 'react';
import { FeatureBannerButton } from './Banner.style';
import * as Styles from './Banner.style';
import ExternalLink from 'components/ExternalLink';

// TODO (Chelsi): set blog post link as href of 'View our observations' button
const Buttons = (props: { scrollTo: any }) => {
  return (
    <Fragment>
      <FeatureBannerButton
        variant="contained"
        color="primary"
        disableRipple
        disableFocusRipple
        onClick={() => props.scrollTo()}
      >
        View chart
      </FeatureBannerButton>
      <ExternalLink href="/">
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
