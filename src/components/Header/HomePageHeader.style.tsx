import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  margin: 1.5rem 1rem;
  text-align: center;

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 2rem 2rem 1rem;
  }
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const Header = styled.h1`
  font-size: 2rem;
  line-height: 1.2;
  max-width: 300px;
  margin: 0 auto 0.75rem;

  @media (min-width: ${materialSMBreakpoint}) {
    font-size: 2.875rem;
    margin: 1rem auto 0.75rem;
    max-width: unset;
  }
`;

export const Subcopy = styled.span`
  font-size: 0.875rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};

  @media (min-width: ${materialSMBreakpoint}) {
    font-size: 1rem;
  }
`;
