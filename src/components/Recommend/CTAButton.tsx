import React from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { StyledFilledButton, StyledOutlinedButton } from './Recommend.style';
import { EventCategory } from 'components/Analytics';
import { RecommendCTA, RecommendCategory } from 'cms-content/recommendations';
import { ButtonType } from 'assets/theme/buttons';

function getButtonType(rawButtonType: 'FILL' | 'OUTLINE' | 'TEXT'): ButtonType {
  switch (rawButtonType) {
    case 'OUTLINE':
      return ButtonType.OUTLINE;
    case 'TEXT':
      return ButtonType.TEXT;
    default:
      return ButtonType.FILL;
  }
}

const StyledButton: React.FC<{
  buttonType: ButtonType;
  trackingCategory: EventCategory;
  trackingLabel: string;
  href: string;
  endIcon: JSX.Element;
}> = ({
  buttonType,
  trackingCategory,
  trackingLabel,
  href,
  endIcon,
  children,
}) => {
  const buttonProps = {
    trackingCategory,
    trackingLabel,
    href,
    endIcon,
  };
  if (buttonType === ButtonType.FILL) {
    return <StyledFilledButton {...buttonProps}>{children}</StyledFilledButton>;
  } else if (buttonType === ButtonType.OUTLINE) {
    return (
      <StyledOutlinedButton {...buttonProps}>{children}</StyledOutlinedButton>
    );
  }
  return null;
};

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
  if (!validFields) {
    return null;
  }
  return (
    <StyledButton
      buttonType={getButtonType(cta.buttonType)}
      trackingCategory={EventCategory.RECOMMENDATIONS}
      trackingLabel={category}
      href={cta.url}
      endIcon={<OpenInNewIcon />}
    >
      {cta.text}
    </StyledButton>
  );
};

export default CTAButton;
