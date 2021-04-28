import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import {
  SectionContainer,
  maxContentWidth,
} from 'components/NewLocationPage/Shared/Shared.style';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const MainWrapper = styled.div`
  background-color: ${COLOR_MAP.GREY_1};

  ${SectionContainer} {
    margin-bottom: 2rem;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: ${maxContentWidth};
  margin-bottom: 1.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-bottom: 2.5rem;
  }
`;
