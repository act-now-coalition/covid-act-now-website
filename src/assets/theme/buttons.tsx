import { COLOR_MAP } from 'common/colors';
import fonts from 'common/theme/fonts';
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

const newBlue = '#3567FD';
const newBlueDark = '#002CB4';
const newBlueLight = 'rgba(53, 103, 253, .15)';
const lightGrayFigma = '#e0e0e0';

export type ButtonMap = {
  [key in ButtonType]: ButtonsTheme;
};

const buttons: ButtonMap = {
  [ButtonType.FILL]: {
    background: newBlue,
    border: newBlue,
    text: 'white',
    backgroundHover: newBlueDark,
    borderHover: newBlueDark,
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
    text: newBlue,
    backgroundHover: newBlueLight,
    borderHover: newBlueLight,
    textHover: newBlueDark,
    icon: COLOR_MAP.GRAY_BODY_COPY,
    fontFamily: fonts.regularBookMidWeight,
    disabledBackground: 'white',
    disabledText: COLOR_MAP.GRAY_BODY_COPY,
    disabledIcon: COLOR_MAP.GREY_3,
  },
  [ButtonType.TEXT]: {
    background: 'transparent',
    border: 'transparent',
    text: newBlue,
    backgroundHover: 'transparent',
    borderHover: 'transparent',
    textHover: newBlueDark,
    icon: COLOR_MAP.GRAY_BODY_COPY,
    fontFamily: fonts.regularBook,
    disabledBackground: COLOR_MAP.GREY_1, // ?
    disabledText: COLOR_MAP.GRAY_BODY_COPY, // ?
    disabledIcon: COLOR_MAP.GREY_3, // ?
  },
};

export default buttons;
