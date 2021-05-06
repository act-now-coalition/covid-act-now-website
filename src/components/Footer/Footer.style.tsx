import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint, mobileBreakpoint } from 'assets/theme/sizes';
import { mobileBreakpointPlus } from 'components/MenuContent/Menu.style';

export const StyledFooter = styled.footer<{ extraPaddingBottom?: boolean }>`
  box-sizing: content-box;
  background: ${COLOR_MAP.BLACK};
  padding: 2rem 1.5rem;
  padding-bottom: ${({ extraPaddingBottom }) =>
    extraPaddingBottom && '9.75rem'};

  @media (min-width: ${materialSMBreakpoint}) {
    padding-bottom: ${({ extraPaddingBottom }) => extraPaddingBottom && '8rem'};
  }

  @media (min-width: ${mobileBreakpoint}) {
    padding: 3rem;
    padding-bottom: ${({ extraPaddingBottom }) => extraPaddingBottom && '8rem'};
  }

  @media (min-width: ${mobileBreakpointPlus}) {
    padding: 4rem;
    padding-bottom: ${({ extraPaddingBottom }) => extraPaddingBottom && '8rem'};
  }
`;
