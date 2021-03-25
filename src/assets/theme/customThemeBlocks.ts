import { COLOR_MAP } from 'common/colors';

/**
 * Used for mega menu and footer, which are the
 * same component (MenuContent.tsx) with differrent colors and alignment.
 */
interface MenuTheme {
  primaryText: string;
  secondaryText: string;
  gray: string;
  buttonContent: string;
  buttonContentHover: string;
  buttonBorder: string;
  aboutUsContentAlignment: string;
  aboutUsTextAlignment: string;
}

export const megaMenu: MenuTheme = {
  primaryText: 'black',
  secondaryText: COLOR_MAP.GREY_4,
  gray: COLOR_MAP.GREY_4,
  buttonContent: COLOR_MAP.NEW_BLUE_PURPLE,
  buttonContentHover: 'white',
  buttonBorder: COLOR_MAP.GREY_2,
  aboutUsContentAlignment: 'flex-start',
  aboutUsTextAlignment: 'left',
};

export const megaMenuFooter: MenuTheme = {
  primaryText: 'white',
  secondaryText: 'white',
  gray: COLOR_MAP.GREY_3,
  buttonContent: 'white',
  buttonContentHover: COLOR_MAP.NEW_BLUE_PURPLE,
  buttonBorder: COLOR_MAP.GREY_3,
  aboutUsContentAlignment: 'center',
  aboutUsTextAlignment: 'center',
};
