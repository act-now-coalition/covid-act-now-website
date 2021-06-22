import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip as MuiTooltip } from '@material-ui/core';
import { Geography } from 'react-simple-maps';

export const USMapWrapper = styled.div``;

export const USStateMapWrapper = styled.div<{
  $showCounties: boolean;
  $highlightOnHover: boolean;
}>`
  path:hover {
    fill-opacity: ${props =>
      !props.$highlightOnHover ? undefined : props.$showCounties ? 0.25 : 0.8};
    fill: ${props =>
      props.$showCounties && props.$highlightOnHover ? '#fff' : undefined};
    cursor: pointer;
  }
`;

export const MobileLineBreak = styled.br`
  @media (min-width: 600px) {
    display: none;
  }
`;

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: 'white',
    color: theme.palette.text.primary,
    fontSize: 14,
    opacity: 1,
    padding: 0,
    borderRadius: theme.spacing(1),
  },
  arrow: {
    color: 'white',
  },
}))(MuiTooltip);

export const Tooltip = styled(LightTooltip)``;

export const GeoPath = styled(Geography).attrs(props => ({
  // Setting tabIndex to -1 avoids the map from becoming a focus trap
  tabIndex: -1,
  role: 'img',
}))`
  /* Prevent focus rectangle appearing on click. */
  outline: none;
`;

// Used to designate the active state when ActiveRegionStyle.OUTLINE is used.
export const StateBorder = styled(GeoPath)`
  fill: none;
  pointer-events: none;
  stroke: black;
  stroke-width: 2px;
`;
