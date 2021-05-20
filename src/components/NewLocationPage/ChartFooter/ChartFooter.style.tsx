import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const ButtonContainer = styled.div`
  flex-grow: 0;
`;

export const Disclaimer = styled.p`
  flex-grow: 1;
  margin: 0;
`;
