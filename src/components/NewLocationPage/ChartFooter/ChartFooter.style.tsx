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
  padding-right: 120px;
  margin: 0;
`;

export const LegendContainer = styled.div`
  display: flex;
  font-size: 0.9rem;
  margin-right: 24px;
`;

export const IconWrapper = styled.div`
  margin-right: 12px;
`;

export const LegendGroup = styled.div`
  display: flex;
  justify-content: flex-start;
`;
