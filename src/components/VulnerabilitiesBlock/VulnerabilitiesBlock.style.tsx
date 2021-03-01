import styled, { css } from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const BorderedContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLOR_MAP.GRAY.LIGHT};
  border-radius: 4px;
  padding: 0.5rem 0.25rem;

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 0.75rem;
    flex-direction: row;
  }
`;

export const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const GraySpan = css`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  text-align: center;

  strong {
    color: black;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    margin-bottom: 4px;
    text-align: left;
  }
`;

export const TextSmall = styled.span`
  ${GraySpan};
  font-size: 0.8125rem;
`;

export const RegionDescription = styled.span`
  ${GraySpan};
  font-size: 1rem;
`;

export const LevelName = styled.span`
  font-weight: bold;
  font-size: 1.125rem;
  text-transform: uppercase;
  margin-bottom; 12px;
  text-align: center;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-bottom: 8px;
    text-align: left;
  }
`;
