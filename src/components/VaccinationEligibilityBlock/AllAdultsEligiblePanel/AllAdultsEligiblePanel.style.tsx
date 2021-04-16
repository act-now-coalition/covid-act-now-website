import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';

export const Container = styled.div`
  padding: 1.5rem;
  border: solid 1px ${COLOR_MAP.GREY_1};
  border-radius: 4px;

  p {
    margin-bottom: 0;
  }
`;
