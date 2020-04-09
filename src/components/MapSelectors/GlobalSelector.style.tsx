import styled from 'styled-components';

const BORDER_COLOR = 'rgba(0,0,0,0.12)';

export const StyledDropDownWrapper = styled.div`
  position: relative;
`;

export const StyledMenu = styled.ul<{
  isOpen?: boolean;
  extendRight?: boolean;
}>`
  z-index: 9999;
  margin: 0;
  padding: 0;
  background: white;
  position: absolute;
  left: 0;
  /* right: ${props => (props.extendRight ? '-70px' : '0')}; */
  right: 0;
  /* transform: translateY(100%); */
  max-height: 400px;
  overflow-y: auto;
  list-style: none;
  border: ${props => (props.isOpen ? '1px solid ' + BORDER_COLOR : 'none')};
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);

  @media (min-width: 600px) {
    right: 0;
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

export const StyledInputWrapper = styled.div<{ isOpen?: boolean }>`
  display: flex;
  align-items: center;
  background: white;
  border-top: 1px solid ${BORDER_COLOR};
  border-left: 1px solid ${BORDER_COLOR};
  border-right: 1px solid ${BORDER_COLOR};
  border-bottom: 1px solid ${BORDER_COLOR};
  border-radius: ${props => (props.isOpen ? '4px 4px 0 0' : '4px')};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  height: 3.5rem;

  @media (min-width: 1350px) {
    height: 4rem;
  }
`;

export const StyledInput = styled.input<{ isOpen?: boolean }>`
  border-radius: ${props => (props.isOpen ? '4px 4px 0 0' : '4px')};
  font-size: 1rem;
  line-height: 1.5rem;
  border: none;
  width: 100%;
  padding: 0 1rem 0 0;

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

  @media (min-width: 1350px) {
    margin: 0 8px;
  }
`;
