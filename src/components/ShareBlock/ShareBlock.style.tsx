import styled, { css } from 'styled-components';
import theme from 'assets/theme';

export const ShareContainer = styled.div`
  margin: ${theme.spacing(6)}px ${theme.spacing(3)}px ${theme.spacing(9)}px;
  @media print {
    display: none;
  }
`;

export const StyledShareButtonStyles = css<{
  color?: string;
  variant?: string;
}>`
  cursor: pointer;
  color: white;
  display: block;
  flex: 1;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  height: 2.5rem;
  line-height: 2.5rem;
  text-transform: uppercase;
  user-select: none;
  text-align: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }

  > button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  svg {
    display: block;
    rect {
      fill: transparent;
    }
    path {
      fill: ${props => (props.color ? props.color : '#000')};
    }
  }
`;
