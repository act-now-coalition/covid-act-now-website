import React from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { StyledFilledButton, StyledOutlinedButton } from './Recommend.style';
import { EventCategory } from 'components/Analytics';
import { RecommendCTA } from 'cms-content/recommendations';
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

const CTAButton: React.FC<RecommendCTA> = ({
  category,
  link,
  buttonType,
  buttonText,
}) => {
  if (getButtonType(buttonType) === ButtonType.FILL) {
    return (
      <StyledFilledButton
        trackingCategory={EventCategory.RECOMMENDATIONS}
        trackingLabel={`${category}: CTA button`}
        href={link}
        endIcon={<OpenInNewIcon />}
      >
        {buttonText}
      </StyledFilledButton>
    );
  } else if (getButtonType(buttonType) === ButtonType.OUTLINE) {
    return (
      <StyledOutlinedButton
        trackingCategory={EventCategory.RECOMMENDATIONS}
        trackingLabel={`${category}: CTA button`}
        href={link}
        endIcon={<OpenInNewIcon />}
      >
        {buttonText}
      </StyledOutlinedButton>
    );
  }
  return null;
};

export default CTAButton;
