import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';
const lightGray = '#f2f2f2';

const chart = {
  background: white,
  foreground: black,
  axis: colors.grey[700],
  grid: black,
  area: colors.grey[200],
  tooltip: {
    background: colors.grey[900],
    text: white,
    shadow: colors.grey[500],
  },
  annotation: black,

  // TODO(michael): Not loving this complexity. Perhaps we could just always use regionColor?
  regionAnnotationStroke: (isActive: boolean, regionColor: string) =>
    isActive ? regionColor : lightGray,
};

// Used for share image charts (e.g. http://localhost:3000/internal/share-image/states/wa/chart/0)
export const chartDarkMode = {
  ...chart,
  background: black,
  foreground: white,
  grid: '#fbfbfb80',
  area: '#ffffff26',
  annotation: white,
  regionAnnotationStroke: (isActive: boolean, regionColor: string) =>
    regionColor,
};

export default {
  black,
  white,
  lightGray,
  primary: {
    contrastText: black,
    dark: white,
    main: white,
    light: white,
  },
  secondary: {
    contrastText: white,
    dark: '#009e53',
    main: '#00d07d',
    light: '#61ffb0',
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: '#3BA5C8',
    main: '#3BBCE6',
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: black,
    secondary: black,
    link: colors.blue[600],
  },
  background: {
    default: white,
    paper: white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
  chart,
};
