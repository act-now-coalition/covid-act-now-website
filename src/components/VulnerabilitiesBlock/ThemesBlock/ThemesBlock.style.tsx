import styled, { css } from 'styled-components';
import { GREY_0, COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  border-radius: 0 0 4px 4px;
  overflow: hidden;
  max-width: 400px;

  @media (min-width: ${materialSMBreakpoint}) {
    border-radius: 4px;
  }
`;

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
  padding: 12px 8px;
  font-weight: 500;
  font-size: 0.7rem;
  text-transform: uppercase;
  line-height: 1;
  max-width: 80px;
  min-width: 80px;
`;
