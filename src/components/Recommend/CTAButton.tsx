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
  const buttonType = rawButtonType.toUpperCase();
  switch (buttonType) {
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
  if (getButtonType(cta.buttonType) === ButtonType.FILL) {
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
  } else if (getButtonType(cta.buttonType) === ButtonType.OUTLINE) {
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
