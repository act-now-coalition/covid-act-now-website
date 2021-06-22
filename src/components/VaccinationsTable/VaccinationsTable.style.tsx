import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';

import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
    padding: 1.5rem 2rem 2rem;
  }
`;

export const ProgressBarWrapper = styled.div`
  margin-left: 0.5rem;
  display: flex;
`;

export const List = styled.ol`
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
  max-width: 315px;
  width: 100%;

  &:first-of-type {
    margin-bottom: 1.5rem;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    &:first-of-type {
      margin-right: 3rem;
      margin-bottom: 0;
    }
  }
`;

export const ListItem = styled.li`
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: 0.5rem;
  }
`;

export const MonospaceItem = styled.span`
  ${props => props.theme.fonts.monospace};
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const LocationName = styled.span`
  ${props => props.theme.fonts.regularBookMidWeight};
  margin-left: 0.25rem;
`;

export const ListItemHalf = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  &:last-child {
    justify-content: flex-end;
  }
`;

export const ColumnHeader = styled.p`
  text-transform: uppercase;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  margin: 0 0 1rem;
  text-align: center;
`;
