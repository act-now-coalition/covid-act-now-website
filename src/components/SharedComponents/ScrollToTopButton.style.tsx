import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';

export const FixedButton = styled.button<{ showButton: boolean }>`
  opacity: ${({ showButton }) => (showButton ? '1' : '0')};
  pointer-events: ${({ showButton }) => !showButton && 'none'};
  transition: opacity 0.2s linear;
  position: fixed;
  bottom: 16px;
  right: 16px;
  border: none;
  background-color: ${COLOR_MAP.BLUE};
  color: white;
  cursor: pointer;
  padding: 12px 16px;
  line-height: 1.75;
  border-radius: 4px;
  font-size: 0.875rem;
  font-family: Roboto;
  text-transform: uppercase;
  font-weight: 500;
  display: flex;

  svg {
    transform: translate(-6px, -1px);
  }
`;
