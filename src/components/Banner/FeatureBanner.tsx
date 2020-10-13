import React, { Fragment } from 'react';
import { FeatureBannerButton } from './Banner.style';
import * as Styles from './Banner.style';
import ExternalLink from 'components/ExternalLink';

// TODO (Chelsi) : plug in 'View Chart' button once merged with branch with scrollTo
// set blog post link as href of 'View our observations' button
export const renderButtons = () => {
  return (
    <Fragment>
      <FeatureBannerButton
        variant="contained"
        color="primary"
        disableRipple
        disableFocusRipple
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
  renderButton?: () => React.ReactElement;
}> = ({ renderButton }) => {
  return (
    <Styles.FeatureBannerContainer container spacing={1}>
      <Styles.MessageContainer item sm md lg>
        For <strong>Indigenous Peoples’ Day</strong>, See COVID data for
        majority Native American communities.
      </Styles.MessageContainer>
      {renderButton && (
        <Styles.ButtonContainer>{renderButton()}</Styles.ButtonContainer>
      )}
    </Styles.FeatureBannerContainer>
  );
};

const FeatureBanner = () => {
  return <FeatureBannerInner renderButton={renderButtons} />;
};

export default FeatureBanner;
