import palette from './palette';
import {
  Variant,
  TypographyStyleOptions,
  FontStyleOptions,
} from '@material-ui/core/styles/createTypography';

type TypographyOptions = Record<Variant | 'p', TypographyStyleOptions> &
  FontStyleOptions;
const typographyOptions: TypographyOptions = {
  p: {
    lineHeight: 1,
  },
  h2: {
    fontSize: '1.8rem',
    fontWeight: 500,
    lineHeight: '2.2rem',
    margin: '0 0 2rem',
    '@media (min-width:600px)': {
      fontSize: '2.8rem',
    },
  },
  h3: {
    fontSize: '1.8rem',
    fontWeight: 500,
    margin: '2rem 0 1rem',
    '@media (min-width:600px)': {
      fontSize: '2.2rem',
    },
  },
  h4: {
    fontSize: '1.4rem',
    fontWeight: 500,
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
  },
  h5: {
    fontWeight: 500,
    fontSize: '1.2rem',
    margin: '1.4rem 0',
    '@media (min-width:600px)': {
      margin: '1.8rem 0 1.2rem',
      fontSize: '1.4rem',
    },
  },
  subtitle1: {
    color: palette.text.primary,
    fontSize: '16px',
    letterSpacing: '-0.05px',
    lineHeight: '25px',
  },
  subtitle2: {
    color: palette.text.secondary,
    fontWeight: 400,
    fontSize: '14px',
    letterSpacing: '-0.05px',
    lineHeight: '21px',
  },
  body1: {
    color: palette.text.primary,
    fontSize: '0.9rem',
    letterSpacing: '-0.05px',
    lineHeight: '21px',
  },
  body2: {
    color: palette.text.secondary,
    fontSize: '0.9rem',
    '@media (min-width:600px)': {
      fontSize: '1rem',
    },
    letterSpacing: '-0.04px',
    lineHeight: '1.4rem',
  },
  // @ts-ignore This seems like a bug?
  whiteText: {
    color: palette.white,
  },
  button: {
    color: palette.text.primary,
    fontSize: '14px',
  },
  caption: {
    color: palette.text.secondary,
    fontSize: '11px',
    letterSpacing: '0.33px',
    lineHeight: '13px',
  },
  overline: {
    color: palette.text.secondary,
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.33px',
    lineHeight: '13px',
    textTransform: 'uppercase',
  },
};

export default typographyOptions;
