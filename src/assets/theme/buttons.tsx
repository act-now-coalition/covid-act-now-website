import { COLOR_MAP } from 'common/colors';
import fonts from 'assets/theme/fonts';
import { FlattenSimpleInterpolation } from 'styled-components';

export enum ButtonType {
  FILL,
  OUTLINE,
  TEXT,
}

export interface ButtonsTheme {
  background: string;
  border: string;
  text: string;
  backgroundHover: string;
  borderHover: string;
  textHover: string;
  disabledBackground: string;
  disabledText: string;
  icon: string;
  disabledIcon: string;
  fontFamily: FlattenSimpleInterpolation;
}

const lightGrayFigma = '#e0e0e0';

export type ButtonMap = {
  [key in ButtonType]: ButtonsTheme;
};

const buttons: ButtonMap = {
  [ButtonType.FILL]: {
    background: COLOR_MAP.NEW_BLUE.BASE,
    border: COLOR_MAP.NEW_BLUE.BASE,
    text: 'white',
    backgroundHover: COLOR_MAP.NEW_BLUE.DARK,
    borderHover: COLOR_MAP.NEW_BLUE.DARK,
    textHover: 'white',
    icon: 'white',
    fontFamily: fonts.regularBookBold,
    disabledBackground: COLOR_MAP.GREY_1,
    disabledText: COLOR_MAP.GRAY_BODY_COPY,
    disabledIcon: COLOR_MAP.GREY_3,
  },
  [ButtonType.OUTLINE]: {
    background: 'white',
    border: lightGrayFigma,
    text: COLOR_MAP.NEW_BLUE.BASE,
    backgroundHover: COLOR_MAP.NEW_BLUE.LIGHT,
    borderHover: COLOR_MAP.NEW_BLUE.LIGHT,
    textHover: COLOR_MAP.NEW_BLUE.DARK,
    icon: COLOR_MAP.GRAY_BODY_COPY,
    fontFamily: fonts.regularBookMidWeight,
    disabledBackground: 'white',
    disabledText: COLOR_MAP.GRAY_BODY_COPY,
    disabledIcon: COLOR_MAP.GREY_3,
  },
  [ButtonType.TEXT]: {
    background: 'transparent',
    border: 'transparent',
    text: COLOR_MAP.NEW_BLUE.BASE,
    backgroundHover: 'transparent',
    borderHover: 'transparent',
    textHover: COLOR_MAP.NEW_BLUE.DARK,
    icon: COLOR_MAP.GRAY_BODY_COPY,
    fontFamily: fonts.regularBook,
    disabledBackground: COLOR_MAP.GREY_1, // TODO (chelsi) - ask UX about disable state
    disabledText: COLOR_MAP.GRAY_BODY_COPY, // ditto^
    disabledIcon: COLOR_MAP.GREY_3, // ditto^
  },
};

export default buttons;
