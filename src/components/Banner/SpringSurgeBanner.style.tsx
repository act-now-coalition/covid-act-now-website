import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { COLOR_MAP } from 'common/colors';

export const Wrapper = styled.div`
  background-color: ${COLOR_MAP.LIGHTGRAY_BG};
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.5rem 1.75rem;
  align-items: center;
  justify-content: center;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
    padding: 2.5rem 1rem;
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  a {
    color: ${COLOR_MAP.BLUE};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (min-width: ${materialSMBreakpoint}) {
    align-items: flex-start;
    text-align: left;
    max-width: 520px;
  }
`;

export const Body = styled.span`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 15px;
  line-height: 1.5;
`;
