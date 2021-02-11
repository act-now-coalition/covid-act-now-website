import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';

export const DisclaimerWrapper = styled.div`
  max-width: 600px;
  margin: 0.5rem 0 1.5rem;
  padding: 1rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;

  @media (max-width: 900px) {
    margin: 0 1rem 1.5rem;
  }
`;

export const DisclaimerSpan = styled.span<{ isOpen?: boolean }>`
  text-decoration: ${({ isOpen }) => !isOpen && 'underline'};
  cursor: pointer;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;
`;
