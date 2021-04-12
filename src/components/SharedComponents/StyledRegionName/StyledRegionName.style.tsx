import styled from 'styled-components';

const textEllipsis = `
  min-width: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Wrapper = styled.div<{ $truncateText?: boolean }>`
  font-weight: 500;
  font-size: 1rem;
  ${({ $truncateText }) => ($truncateText ? textEllipsis : '')}
  line-height: 1.4;
`;

export const Suffix = styled.span`
  font-weight: normal;
  margin-right: 0.25rem;
`;
