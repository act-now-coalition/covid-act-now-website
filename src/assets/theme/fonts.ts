import { css, FlattenSimpleInterpolation } from 'styled-components';

export interface ThemeFonts {
  regularBook: FlattenSimpleInterpolation;
  regularBookMidWeight: FlattenSimpleInterpolation;
  regularBookBold: FlattenSimpleInterpolation;
  monospace: FlattenSimpleInterpolation;
  monospaceMidWeight: FlattenSimpleInterpolation;
  monospaceBold: FlattenSimpleInterpolation;
}

const fonts: ThemeFonts = {
  regularBook: css`
    font-family: Roboto;
    font-weight: 400;
  `,
  regularBookMidWeight: css`
    font-family: Roboto;
    font-weight: 500;
  `,
  regularBookBold: css`
    font-family: Roboto;
    font-weight: 700;
  `,
  monospace: css`
    font-family: Source Code Pro;
    font-weight: 400;
  `,
  monospaceMidWeight: css`
    font-family: Source Code Pro;
    font-weight: 500;
  `,
  monospaceBold: css`
    font-family: Source Code Pro;
    font-weight: 700;
  `,
};

export default fonts;
