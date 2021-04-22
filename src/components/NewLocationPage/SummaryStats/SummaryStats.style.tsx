import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Hidden from '@material-ui/core/Hidden';
import { Chevron } from '../Shared/Shared.style';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

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
  font-size: 1rem;
  line-height: 1;
`;

export const MetricLabel = styled.span`
  ${props => props.theme.fonts.regularBookMidWeight};
  font-size: 1rem;
`;

export const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
  }
`;

export const StatContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.25rem;

  &:not(:last-of-type) {
    margin-bottom: 1.5rem;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: column;
    justify-content: unset;
  }
`;

export const Row = styled.div`
  display: flex;
`;

export const StyledChevron = styled(Chevron)`
  transform: none;
`;

export const MeasureTextWrapper = styled.div`
  margin-left: 0.5rem;
`;

export const MobileOnly = styled(Hidden).attrs(props => ({
  smUp: true,
}))``;

export const DesktopOnly = styled(Hidden).attrs(props => ({
  xsDown: true,
}))``;
