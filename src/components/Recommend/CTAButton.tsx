import React from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { StyledFilledButton, StyledOutlinedButton } from './Recommend.style';
import { EventCategory } from 'components/Analytics';
import { RecommendCTA, RecommendCategory } from 'cms-content/recommendations';
import { ButtonType } from 'assets/theme/buttons';

function getButtonType(rawButtonType: string): ButtonType {
  if (!rawButtonType) {
    return ButtonType.FILL;
  }
  switch (rawButtonType) {
    case 'OUTLINE':
      return ButtonType.OUTLINE;
    case 'TEXT':
      return ButtonType.TEXT;
    default:
      return ButtonType.FILL;
  }
}

const CTAButton: React.FC<{
  cta: RecommendCTA;
  category: RecommendCategory;
}> = ({ cta, category }) => {
  /**
   * Although CTA buttons are optional, in Netlify, if a parent (i.e. CTA button) is optional,
   * all fields underneath it (i.e. buttonType, text, url) must be optional.
   * This leaves room for content writers to fill in some fields for the CTA button, but not all.
   * `validFields` confirms all fields are filled prior to returning a button.
   */
  const validFields = cta.buttonType && cta.text && cta.url;
  if (validFields && getButtonType(cta.buttonType) === ButtonType.FILL) {
    return (
      <StyledFilledButton
        trackingCategory={EventCategory.RECOMMENDATIONS}
        trackingLabel={`${category}: CTA button`}
        href={cta.url}
        endIcon={<OpenInNewIcon />}
      >
        {cta.text}
      </StyledFilledButton>
    );
  } else if (
    validFields &&
    getButtonType(cta.buttonType) === ButtonType.OUTLINE
  ) {
    return (
      <StyledOutlinedButton
        trackingCategory={EventCategory.RECOMMENDATIONS}
        trackingLabel={`${category}: CTA button`}
        href={cta.url}
        endIcon={<OpenInNewIcon />}
      >
        {cta.text}
      </StyledOutlinedButton>
    );
  }
  return null;
};

export default CTAButton;
