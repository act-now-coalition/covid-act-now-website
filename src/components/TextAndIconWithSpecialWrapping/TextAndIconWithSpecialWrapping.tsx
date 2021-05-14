/**
 * This component is used for text that is punctuated by an icon.
 * For example, a link that has an arrow icon at the end of the CTA/text
 *
 * Problem that this solves: When the text is a single entity, seperate of the
 * icon, the icon wraps independently, and at certain breakpoints
 * ends up wrapping onto a new line alone - which looks strange
 *
 * This component puts the last word of the CTA into a non-wrapping span with the icon,
 * so the icon is always on a line with text
 *
 * TODO: move file elsewhere, implement for vulnerabilities table of subscores + info icons
 */

import React from 'react';
import styled from 'styled-components';

const SpanWithWrappingRule = styled.span<{ nonWrapping?: boolean }>`
  ${props => props.theme.fonts.regularBookMidWeight};
  white-space: ${({ nonWrapping }) => nonWrapping && 'nowrap'};
`;

const TextAndIconWithSpecialWrapping: React.FC<{ text: string; icon: any }> = ({
  text,
  icon,
}) => {
  const splitText = text.split(' ').reverse(); // Reverses in order to grab the last element on the next line:
  const [first, ...rest] = splitText;
  const reversedRest = rest.reverse().join(' '); // Puts rest back together in original order

  return (
    <>
      <SpanWithWrappingRule>{reversedRest} </SpanWithWrappingRule>
      <SpanWithWrappingRule nonWrapping>
        {first}
        {icon}
      </SpanWithWrappingRule>
    </>
  );
};

export default TextAndIconWithSpecialWrapping;
