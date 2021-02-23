/**
 * Used to make tooltips accessible. This hidden div contains a description of the
 * tooltip's content.
 * The div's ID (elemId) is referenced by the tooltip's aria-describedby attribute.
 * https://inclusive-components.design/tooltips-toggletips/
 */

import React from 'react';
import styled from 'styled-components';

export const HiddenDiv = styled.div`
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const VisuallyHiddenDiv: React.FC<{
  content: React.ReactNode;
  elemId: string;
}> = ({ content, elemId }) => {
  return (
    <HiddenDiv role="tooltip" id={elemId}>
      {content}
    </HiddenDiv>
  );
};

export default VisuallyHiddenDiv;
