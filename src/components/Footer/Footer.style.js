import styled from 'styled-components';

import { mobileBreakpoint } from 'assets/theme/sizes';

export const StyledFooter = styled.div`
  padding: 1rem;
  background: white;

  @media (min-width: ${mobileBreakpoint}) {
    padding: 2rem;
  }
`;

export const StyledFooterBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const StyledFooterBodyLinks = styled.div`
  flex: 0 0 100%;
  text-align: center;
  padding: 2rem 0;

  @media (min-width: ${mobileBreakpoint}) {
    flex: 0 0 40%;
    padding: 3rem 0;
  }

  span {
    cursor: pointer;
    margin: 0 1rem;
  }
`;

export const StyledFooterBodyCallout = styled.div`
  flex: 0 0 100%;
  text-align: center;
  padding: 1rem 0 2rem;

  @media (min-width: ${mobileBreakpoint}) {
    flex: 0 0 40%;
    padding: 3rem;
  }
`;

export const StyledFooterCaption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledFooterHeader = styled.div`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    width: 65px;
    height: 65px;
  }

  @media(min-width: ${mobileBreakpoint}) {
    padding: 0 4rem;
  }

  div {
    width: 35%;
    height: 1px;
    background: black;
  }
`;
