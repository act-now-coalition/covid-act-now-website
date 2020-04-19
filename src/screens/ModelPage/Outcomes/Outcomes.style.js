import styled from 'styled-components';
import { COLORS } from 'enums';

export const OutcomesWrapper = styled.div`
  overflow: scroll;
  text-align: left;

  h2 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
`;

export const OutcomesTable = styled.div`
  min-width: 500px;
  width: 100%;
  margin: auto;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  text-align: left;
  table-layout: fixed;
`;

export const OutcomesTableHeader = styled.div`
  display: flex;
  background: ${COLORS.LIGHTGRAY};
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;

  > div {
    flex: 1;
    padding: 16px;
  }
`;

export const OutcomesTableRow = styled.div`
  display flex;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  &:last-child {
    border-bottom: 0;
  }

  > div {
    flex: 1;
    padding: 16px;
  }
`;
