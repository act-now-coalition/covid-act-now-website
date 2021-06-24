import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const thermometerBarHeight = 8;

export const ThermometerContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.span`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;

  strong {
    color: black;
  }
`;

export const ColorBlock = styled.div<{ color: string }>`
  height: ${thermometerBarHeight}px;
  width: 24px;
  background-color: ${({ color }) => color};

  &:first-of-type {
    border-radius: 99px 0 0 99px;
    margin-left: 0.75rem;
  }

  &:last-of-type {
    border-radius: 0 99px 99px 0;
    margin-right: 0.75rem;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    width: 28px;
  }
`;
