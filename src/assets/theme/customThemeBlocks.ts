import { COLOR_MAP } from 'common/colors';

/**
 * Used for mega menu and footer, which are the
 * same component (MenuContent.tsx) with differrent colors and alignment.
 */
export const megaMenu = {
  primaryText: 'black',
  secondaryText: COLOR_MAP.GREY_4,
  gray: COLOR_MAP.GREY_4,
  buttonContent: COLOR_MAP.NEW_BLUE_PURPLE,
  buttonContentHover: 'white',
  buttonBorder: COLOR_MAP.GREY_2,
  aboutUsContentAlignment: 'flex-start',
  aboutUsTextAlignment: 'left',
};

export const megaMenuFooter = {
  primaryText: 'white',
  secondaryText: 'white',
  gray: COLOR_MAP.GREY_3,
  buttonContent: 'white',
  buttonContentHover: COLOR_MAP.NEW_BLUE_PURPLE,
  buttonBorder: COLOR_MAP.GREY_3,
  aboutUsContentAlignment: 'center',
  aboutUsTextAlignment: 'center',
};
