import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import { COLOR_MAP } from 'common/colors';

export const FixedButton = styled(MuiButton)<{ showButton: boolean }>`
  opacity: ${({ showButton }) => (showButton ? '1' : '0')};
  transition: opacity 0.25s linear;
  position: fixed;
  bottom: 16px;
  right: 16px;
  border: none;
  background-color: ${COLOR_MAP.BLUE};
  color: white;
  cursor: pointer;
  padding: 6px 16px;
  line-height: 1.75;
  border-radius: 4px;
  font-size: 0.875rem;
`;
