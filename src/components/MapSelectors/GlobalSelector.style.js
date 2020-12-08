import styled from 'styled-components';

const BORDER_COLOR = 'rgba(0,0,0,0.12)';

export const StyledDropDownWrapper = styled.div`
  height: 3.5rem;
  width: 100%;

  @media (min-width: 1350px) {
    height: 4rem;
  }
`;

export const StyledMenu = styled.ul`
  z-index: 9999;
  margin: 3.5rem 0 0;
  padding: 0;
  background: white;
  position: absolute;
  left: 0;
  right: 0;
  max-height: 400px;
  overflow-y: auto;
  list-style: none;
  border: ${props => (props.isOpen ? '1px solid ' + BORDER_COLOR : 'none')};
  border-top: none;
  border-radius: 0 0 4px 4px;

  @media (min-width: 1350px) {
    margin-top: 4rem;
  }
`;

export const StyledMenuItem = styled.li`
  padding: 0.5rem 0.75rem;
  border-top: 1px solid ${BORDER_COLOR};
  cursor: pointer;

  &:first-child {
    border-top: none;
  }

  &:hover,
  &:active {
    background: #f2f2f2;
  }
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: solid 1px ${BORDER_COLOR};
  border-radius: ${props => (props.isOpen ? '4px 4px 0 0' : '4px')};
  position: ${props => (props.isOpen ? 'absolute' : 'relative')};
  left: 0;
  right: 0;
  box-sizing: border-box;
  height: 3.5rem;
  width: 100%;
  margin: auto 0;

  @media (min-width: 1350px) {
    height: 4rem;
  }
`;

export const StyledInput = styled.input`
  font-size: 1rem;
  line-height: 1.5rem;
  border: none;
  width: 100%;
  padding: 0 1rem 0 0;

  // When the font-size of an input element is smaller than 16px, Safari will
  // zoom in when the user enters the input, and won't zoom out when the user
  // leaves the input area. The fix is increasing the font size from 14px to 16px
  // and scaling the input element by 14/16 = 0.875.
  // https://trello.com/c/Kpu34lhS/603-horizontal-scrollbar-on-iphone-after-using-search-box
  transform: scale(0.875);
  transform-origin: left top;
  margin-top: 0.25rem;

  &:focus {
    outline: none;
  }
`;

export const StyledInputIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 48px;
  margin: 0 4px;

  @media (min-width: 600px) {
    margin: 0 0 0 8px;
  }
`;

export const StyledZipcodeInCounty = styled.span`
  color: rgba(0, 0, 0, 0.7);
  font-style: italic;
  display: inline-block;
`;
