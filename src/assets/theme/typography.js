import palette from './palette';
import { mobileBreakpoint } from './sizes';

const headerFamily = '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif'

export default {
  p: {
    lineHeight: '1',
  },
  h2: {
    fontFamily: headerFamily,
    fontSize: '2.1rem',
    fontWeight: '500',
    lineHeight: '2.2rem',
    margin: '0 0 1rem',
    [`@media (min-width:${mobileBreakpoint})`]: {
      fontSize: '2.8rem',
    },
  },
  h3: {
    fontSize: '1.8rem',
    fontWeight: '500',
    margin: '1rem 0 0.2rem',
    fontFamily: headerFamily,
    [`@media (min-width:${mobileBreakpoint})`]: {
      fontSize: '2.2rem',
    },
  },
  h4: {
    fontFamily: headerFamily,
    fontSize: '1.4rem',
    fontWeight: '500',
    [`@media (min-width:${mobileBreakpoint})`]: {
      fontSize: '1.5rem',
    },
  },
  h5: {
    fontFamily: headerFamily,
    fontWeight: '500',
    fontSize: '1.2rem',
    margin: '1.4rem 0 0.2rem',
    [`@media (min-width:${mobileBreakpoint})`]: {
      margin: '1.8rem 0 0.2rem',
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
    fontSize: '1rem',
    letterSpacing: '-0.05px',
    lineHeight: '21px',
    fontWeight: 500
  },
  body2: {
    color: palette.text.secondary,
    fontSize: '0.9rem',
    [`@media (min-width:${mobileBreakpoint})`]: {
      fontSize: '1rem',
    },
    letterSpacing: '-0.04px',
    lineHeight: '1.4rem',
  },
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
