import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint, materialSMBreakpoint } from 'assets/theme/sizes';
import { desktopNavHeight } from 'components/NavBar/NavBar.style';

// Need to add a good amount of bottom padding for mobile screens to make sure the bottom
// of the mega menu isn't covered by the browser's menu bar
export const StyledMegaMenu = styled.nav`
  background: white;
  border-top: 1px solid ${COLOR_MAP.GREY_2};
  border-bottom: 1px solid ${COLOR_MAP.GREY_2};
  transform: translateY(${desktopNavHeight}px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 2rem 1.5rem 8rem;
  height: calc(100vh - 224px);
  overflow-y: auto;
  box-sizing: content-box;
  box-shadow: 0px 15px 30px -15px rgba(0, 0, 0, 0.2);

  @media (min-width: ${materialSMBreakpoint}) {
    height: auto;
  }

  @media (min-width: ${mobileBreakpoint}) {
    padding: 3rem;
  }
`;
