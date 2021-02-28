import styled, { css } from 'styled-components';
import { GREY_0, COLOR_MAP } from 'common/colors';

export const Row = styled.div`
  display: flex;

  &:nth-child(odd) {
    background-color: ${GREY_0};
  }
`;

const CellStyles = css`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const ThemeNameCell = styled.div`
  ${CellStyles};
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;
  padding: 10px 12px;
  line-height: 1.25;
`;

export const LevelCell = styled.div<{ color: string }>`
  ${CellStyles};
  background-color: ${({ color }) => color};
  color: white;
  max-width: 80px;
  padding: 12px 8px;
  font-weight: 500;
  font-size: 0.7rem;
  text-transform: uppercase;
  line-height: 1;
`;
