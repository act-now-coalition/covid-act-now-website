import styled, { css } from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';

const triangleSize = '7px';

export const Wrapper = styled.div`
  max-width: 300px;
  width: 100%;
`;

export const Content = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  padding: 16px 24px;
  font-size: 0.8125rem;
  line-height: 1.4;

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 16px;
  }
`;

const SharedArrowStyles = css`
  width: 0;
  height: 0;
  border-left: ${triangleSize} solid transparent;
  border-right: ${triangleSize} solid transparent;
  margin: auto;
`;

export const ArrowUp = styled.div`
  ${SharedArrowStyles};
  border-bottom: ${triangleSize} solid black;
`;

export const ArrowDown = styled.div`
  ${SharedArrowStyles};
  border-top: ${triangleSize} solid black;
`;
