import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLOR_MAP } from 'common/colors';

import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.25rem;

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
  margin-right: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ListItemHalf = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-wrap: nowrap;
  max-width: 50%;

  &:last-child {
    justify-content: flex-end;
  }
`;

export const ColumnHeader = styled.p`
  text-transform: uppercase;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  margin: 0 0 1rem;
  text-align: center;
  font-size: 0.875rem;
`;

export const StyledLink = styled(Link)`
  display: flex;
  font-size: inherit;
  text-decoration: inherit;
  color: inherit;
  width: 100%;

  &:hover {
    ${LocationName} {
      color: ${COLOR_MAP.NEW_BLUE.BASE};
    }
  }
`;
