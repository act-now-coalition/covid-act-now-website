import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  margin: 1rem auto;

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 2rem auto;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-top: 1.25rem;
  }
`;

export const AboutText = styled(Link)`
  ${props => props.theme.fonts.regularBook};
  font-size: 0.875rem;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;
  color: ${COLOR_MAP.GREY_4};
  margin-right: 1.5rem;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: rgb(0, 95, 204) 1px auto;
  }
`;
