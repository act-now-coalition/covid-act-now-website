import styled, { css } from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';

const ColumnToRow = css`
  flex-direction: column;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  ${ColumnToRow};
`;

export const Section = styled.div`
  ${ColumnToRow};
  border: dotted 1px black;
`;

export const MultiStatsWrapper = styled.div`
  display: flex;
  ${ColumnToRow};
`;

export const StatWrapper = styled.div`
  border: 1px solid blue;

  &:not(:last-child) {
    margin-bottom: 0.75rem;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    margin-right: 0.75rem;

    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`;

export const Item = styled.div`
  border: 1px solid red;

  @media (min-width: ${materialSMBreakpoint}) {
    &:first-child {
      margin-bottom: 1.25rem;
    }
  }
`;
