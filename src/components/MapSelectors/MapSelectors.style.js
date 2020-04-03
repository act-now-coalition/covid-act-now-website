import styled from 'styled-components';

export const StyledNoOptionsMessage = styled.div`
  padding: 0.75rem 0.5rem;
  background: #e3e3e3;
  margin: -0.1rem -0.35rem;
  font-size: 0.9rem;
  color: black;
`;

export const StyledNoResultsMenuOption = styled.div`
  padding: 0.75rem 0.5rem;
  background: #e3e3e3;
  margin: 0.4rem 0.35rem;
  font-size: 0.9rem;
`;

export const StyledResultsMenuOption = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  /* TODO use when we kbow if there is county data */
  /* opacity: ${props => (props.hasData ? '1' : '0.4')}; */

  strong {
    font-weight: 600;
  }
`;

export const StyledDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props =>
    props.color ? props.color : 'rgba(0, 0, 0, 0.12)'};
  position: relative;
  top: 5px;
`;

export const StyledResultsMenuSubText = styled.div`
  color: rgba(0, 0, 0, 0.7);
`;

export const StyledState = styled.div`
  position: relative;
  top: 3px;
`;

export const StyledCounty = styled.div`
  position: relative;
  top: 3px;
`;
