import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const FooterSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

export const FooterText = styled.p`
  margin: 0 0 12px 0;
`;

export const SingleButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const ButtonContainer = styled.div`
  flex-grow: 0;
  margin-left: 8px;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-left: 120px;
  }
`;

export const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
  }
`;

export const LegendContent = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.9rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-right: 24px;
  }
`;

export const IconWrapper = styled.div`
  margin-right: 12px;
`;

export const AboutText = styled.span`
  line-height: 36px;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;

  @media (min-width: ${materialSMBreakpoint}) {
    line-height: 24px;
    text-decoration-style: solid;
  }
`;
