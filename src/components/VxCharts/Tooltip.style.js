import styled from 'styled-components';

const fontFamily = "'Source Code Pro', 'Roboto', sans-serif";

export const TooltipWrapper = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  pointer-events: none;
`;

export const TooltipContent = styled.div`
  transform: translate(-50%, calc(-100% - 10px));
  width: 160px;
  padding: 10px;
  border-radius: 2px;
  background-color: #333;
  color: #eee;
  font-family: ${fontFamily};
  box-shadow: 3px 3px 5px #ccc;
`;

export const TooltipTitle = styled.div`
  font-size: 11px;
`;

export const TooltipBody = styled.div`
  font-size: 13px;
`;
