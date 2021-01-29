import styled from 'styled-components';

export const Wrapper = styled.div<{ $condensed?: boolean }>`
  font-weight: 500;
  font-size: ${({ $condensed }) => ($condensed ? '1rem' : '1.125rem')};

  // Add ellipsis if the text is too long
  min-width: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Suffix = styled.span`
  font-weight: normal;
  margin-right: 0.25rem;
`;
