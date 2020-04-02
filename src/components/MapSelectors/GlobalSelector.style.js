import styled from 'styled-components';

const BORDER_COLOR = 'rgba(0,0,0,0.12)';

export const StyledDropDownWrapper = styled.div`
  position: relative;
`;

export const StyledMenu = styled.ul`
  z-index: 9999;
  margin: 0;
  padding: 0;
  background: white;
  position: absolute;
  left: 0;
  /* right: ${props => (props.extendRight ? '-70px' : '0')}; */
  right: 0;
  transfrom: translateY(100%);
  max-height: 400px;
  overflow-y: auto;
  list-style: none;
  border: ${props => (props.isOpen ? '1px solid ' + BORDER_COLOR : 'none')};
  border-radius: 0 0 3px 3px;

  @media (min-width: 600px) {
    right: 0;
  }
`;

export const StyledMenuItem = styled.li`
  padding: 0.5rem 0.75rem;
  border-top: 1px solid ${BORDER_COLOR};

  &:first-child {
    border-top: none;
  }
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-top: 1px solid ${BORDER_COLOR};
  border-left: 1px solid ${BORDER_COLOR};
  border-right: 1px solid ${BORDER_COLOR};
  border-bottom: 1px solid ${BORDER_COLOR};
  border-radius: ${props => (props.isOpen ? '4px 4px 0 0' : '4px')};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
`;

export const StyledInput = styled.input`
  border-radius: ${props => (props.isOpen ? '4px 4px 0 0' : '4px')};
  font-size: 16px;
  border: none;
  width: 100%;
  padding: 1rem 1rem 1rem 0;

  &:focus {
    outline: none;
  }
`;

export const StyledInputIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 50px;
`;
