import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Hidden from '@material-ui/core/Hidden';
import { materialSMBreakpoint } from 'assets/theme/sizes';
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

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 1.75rem;
  }
`;

export const Chevron = styled(MuiChevronRightIcon)`
  color: ${COLOR_MAP.GREY_3};
  transform: translateY(5.5px);
  margin-left: 0.5rem;
  font-size: 1.3rem;
`;

export const GrayTitle = styled.h2`
  margin: 0 0 1.5rem;
  font-size: 0.9rem;
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
  font-size: 0.75rem;
  margin-right: 0.5rem;
  display: flex;
  align-self: center;
`;

export const MobileOnly = styled(Hidden).attrs(props => ({
  smUp: true,
}))``;

export const DesktopOnly = styled(Hidden).attrs(props => ({
  xsDown: true,
}))``;
