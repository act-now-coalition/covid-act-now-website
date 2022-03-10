import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { COLOR_MAP } from 'common/colors';

export const Container = styled.div`
  background-color: ${COLOR_MAP.LIGHTGRAY_BG};
  padding: 2rem;
  display: flex;
  flex-direction: column;

  @media (max-width: ${materialSMBreakpoint}) {
    padding: 1.5rem;
  }
`;

export const Header = styled.span`
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: ${materialSMBreakpoint}) {
    text-align: left;
    margin-right: 1rem;
  }
`;

export const SubHeader = styled.span`
  text-align: center;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.9rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${materialSMBreakpoint}) {
    text-align: left;
    margin-bottom: 1rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: ${materialSMBreakpoint}) {
    flex-direction: column;
  }
`;
