import styled, { css } from 'styled-components';
import { Box, Typography } from '@material-ui/core';
import palette from 'assets/theme/palette';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint, materialSMBreakpoint } from 'assets/theme/sizes';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export const CircleIcon = styled(FiberManualRecordIcon)<{ $iconColor: string }>`
  color: ${({ $iconColor }) => $iconColor};
  circle {
    r: 4;
  }
`;

export const Value = styled.span`
  ${props => props.theme.fonts.monospaceBold};
  font-size: 1.125rem;

  @media (min-width: ${materialSMBreakpoint}) {
    font-size: 1.5rem;
  }
`;

export const ValueWrapper = styled.div`
  display: flex;
  width: fit-content;
`;

export const MeasureText = styled.span`
  text-transform: uppercase;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;
