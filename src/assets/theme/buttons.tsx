import { COLOR_MAP } from 'common/colors';
import fontBlocks from './fontBlocks';
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

export const newBlue = '#3567FD';
export const newBlueDark = '#002CB4';
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
    fontFamily: fontBlocks.regularBookBold,
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
    fontFamily: fontBlocks.regularBookMidWeight,
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
    fontFamily: fontBlocks.regularBook,
    disabledBackground: COLOR_MAP.GREY_1, // TODO (chelsi) - ask UX about disable state
    disabledText: COLOR_MAP.GRAY_BODY_COPY, // ditto^
    disabledIcon: COLOR_MAP.GREY_3, // ditto^
  },
};

export default buttons;
