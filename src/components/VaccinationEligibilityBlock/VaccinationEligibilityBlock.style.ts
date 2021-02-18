import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';

export const Container = styled.div``;

export const Section = styled.div`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const Source = styled.div`
  font-size: 14px;
  color: ${COLOR_MAP.GREY_5};

  a {
    color: ${COLOR_MAP.GREY_5};
  }
`;
