import React from 'react';
import { GreenButton, WhiteButton, StyledLink } from './SectionButton.style';

export enum ButtonTheme {
  WHITE,
  GREEN,
}

const SectionButton = (props: {
  cta: string;
  redirect: string;
  theme: ButtonTheme;
}) => {
  const themeToButtonMap = {
    [ButtonTheme.WHITE]: WhiteButton,
    [ButtonTheme.GREEN]: GreenButton,
  };

  const ButtonComponent = themeToButtonMap[props.theme];

  return (
    <StyledLink to={props.redirect}>
      <ButtonComponent theme={props.theme} disableRipple>
        {props.cta}
      </ButtonComponent>
    </StyledLink>
  );
};

export default SectionButton;
