import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';
import { mobileBreakpointPlus } from 'components/MenuContent/Menu.style';

export const StyledFooter = styled.footer`
  box-sizing: content-box;
  background: ${COLOR_MAP.BLACK};
  padding: 2rem 1.5rem;

  @media (min-width: ${mobileBreakpoint}) {
    padding: 3rem;
  }

  @media (min-width: ${mobileBreakpointPlus}) {
    padding: 4rem;
  }
`;

export const ShareBlock = styled.div`
  display: flex;
  margin-left: auto;
`;
