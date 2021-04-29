import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Hidden from '@material-ui/core/Hidden';
import { mobileBreakpoint, materialSMBreakpoint } from 'assets/theme/sizes';
import MuiChevronRightIcon from '@material-ui/icons/ChevronRight';
import { COLOR_MAP } from 'common/colors';

// Move elsewhere--max content width for the whole page
// export const maxContentWidth = '960px';
export const maxContentWidth = '1000px';

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 4px;
  padding: 1.25rem;

  @media (min-width: ${mobileBreakpoint}) {
    padding: 1.5rem;
  }
`;

export const Chevron = styled(MuiChevronRightIcon)`
  color: ${COLOR_MAP.GREY_3};
  transform: translateY(6px);
  margin-left: 0.75rem;
  font-size: 1.3rem;
`;

export const GrayTitle = styled.h2`
  margin: 0 0 1.5rem;
  font-size: 1rem;
  line-height: 1.4;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  text-transform: uppercase;
`;

export const GrayBodyCopy = styled.p`
  margin: 0;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const CircleIcon = styled(FiberManualRecordIcon)<{ $iconColor: string }>`
  color: ${({ $iconColor }) => $iconColor};
  circle {
    r: 4;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    // counteracts the svg's built-in padding, so the icon is aligned with the text above it:
    margin-left: -6px;
  }
`;

export const MobileOnly = styled(Hidden).attrs(props => ({
  smUp: true,
}))``;

export const DesktopOnly = styled(Hidden).attrs(props => ({
  xsDown: true,
}))``;
