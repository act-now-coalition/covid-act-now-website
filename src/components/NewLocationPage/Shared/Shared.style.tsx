import styled from 'styled-components';
import { mobileBreakpoint } from 'assets/theme/sizes';
import MuiChevronRightIcon from '@material-ui/icons/ChevronRight';
import { COLOR_MAP } from 'common/colors';

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
