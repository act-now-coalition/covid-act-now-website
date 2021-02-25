import styled, { css } from 'styled-components';
import { GREY_0, COLOR_MAP } from 'common/colors';

const CellStyles = css`
  display: flex;
  align-items: center;
  width: 100%;
  line-height: 1.25;
`;

export const ScoreNameCell = styled.div`
  ${CellStyles};
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;
  padding: 10px 12px;
`;

export const LevelCell = styled.div`
  ${CellStyles};
  background-color: purple;
  color: white;
  max-width: 80px;
  padding: 12px 8px;
  font-weight: 500;
  font-size: 0.7rem;
  text-transform: uppercase;
`;

export const Row = styled.div<{ grayRow?: boolean }>`
  background-color: ${({ grayRow }) => grayRow && GREY_0};
  display: flex;

  &:last-of-type {
    ${LevelCell} {
      border-radius: 0 0 4px 0;
    }
  }
`;
