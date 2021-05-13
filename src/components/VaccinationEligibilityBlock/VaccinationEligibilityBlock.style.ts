import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';

export const Container = styled.div``;

export const EligibleListContainer = styled.div`
  padding: 1.5rem;
  border: solid 1px ${COLOR_MAP.GREY_1};
  border-radius: 4px;

  p {
    margin-bottom: 0;
  }
`;

export const Section = styled.div`
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const EligibleList = styled.ul`
  margin: 0px auto;
  margin-inline-start: 1em;
  padding-inline-start: 0.5em;

  li::marker {
    content: '✓  ';
    color: ${COLOR_MAP.GREEN.BASE};
  }
`;

export const StyledEligibilityPanel = styled.div``;

export const LinksDescription = styled.span`
  font-size: 16px;
  color: black;
`;
