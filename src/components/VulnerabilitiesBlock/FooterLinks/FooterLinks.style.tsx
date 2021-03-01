import styled from 'styled-components';
import { COLOR_MAP, GREY_3 } from 'common/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;

  a {
    text-decoration: none;
    color: ${COLOR_MAP.BLUE};
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ListHeader = styled.span`
  font-weight: bold;
`;

export const LinkList = styled.ul`
  margin: 0.75rem 0;
  padding: 0 1.5rem;

  li {
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
    ::marker {
      color: ${GREY_3};
    }
  }
`;
