import styled from 'styled-components';

const textEllipsis = `
  min-width: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Wrapper = styled.div<{
  $condensed?: boolean;
  $truncateText?: boolean;
}>`
  font-weight: 500;
  font-size: ${({ $condensed }) => ($condensed ? '1rem' : '1.125rem')};
  ${({ $truncateText }) => ($truncateText ? textEllipsis : '')}
`;

export const Suffix = styled.span`
  font-weight: normal;
  margin-right: 0.25rem;
`;
