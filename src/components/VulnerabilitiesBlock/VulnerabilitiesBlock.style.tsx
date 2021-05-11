import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint, mobileBreakpoint } from 'assets/theme/sizes';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 1.5rem;
  }

  @media (min-width: ${mobileBreakpoint}) {
    flex-direction: row;
  }
`;

const ColumnStyles = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${mobileBreakpoint}) {
    align-items: unset;
  }
`;

export const FirstColumn = styled.div`
  ${ColumnStyles};
  padding: 1.5rem 2.5rem 0.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 0;
  }

  @media (min-width: ${mobileBreakpoint}) {
    margin-right: 1rem;
  }
`;

export const SecondColumn = styled.div`
  ${ColumnStyles};
`;

export const TextSmall = styled.span`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  text-align: center;

  @media (min-width: ${mobileBreakpoint}) {
    text-align: left;
  }
`;

const BodyCopy = css`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 1rem;
  text-align: center;

  strong {
    color: black;
  }

  @media (min-width: ${mobileBreakpoint}) {
    text-align: left;
    max-width: 385px;
  }
`;

export const SummaryText = styled.span`
  ${BodyCopy};
  margin: 1.25rem 0 0.5rem;

  &:last-child {
    margin: 0.5rem 0 1.25rem;
  }

  @media (min-width: ${mobileBreakpoint}) {
    margin: 1.25rem 0 0;

    &:last-child {
      margin: 1.25rem 0 0;
    }
  }
`;

export const StyledLink = styled(Link)`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;
  display: block;
  margin: 0.5rem 0 1.25rem;
  text-align: left;
`;

export const LevelName = styled.span`
  font-weight: bold;
  font-size: 1.125rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;

  @media (min-width: ${mobileBreakpoint}) {
    margin-bottom: 0.5rem;
    text-align: left;
  }
`;
