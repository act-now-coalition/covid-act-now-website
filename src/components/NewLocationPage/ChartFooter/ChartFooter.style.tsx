import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

// Position relative needed?
export const FooterSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

export const SingleButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

// Padding needed?
export const ButtonContainerA = styled.div`
  flex-grow: 0;
  padding: 0;
  margin-left: 8px;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-left: 120px;
  }
`;

export const LegendContainerA = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const LegendContent = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.9rem;
`;

export const AboutText = styled.span`
  line-height: 36px;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;
`;

export const FooterContainer = styled.div`
  display: flex;
  margin-top: 12px;
  flex-direction: row;
  justify-content: space-between;
  color: ${COLOR_MAP.GRAY_BODY_COPY};

  @media (min-width: ${materialSMBreakpoint}) {
    margin-top: 24px;
    margin-bottom: 1.5rem;
  }
`;

export const MobileFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const ButtonContainer = styled.div`
  flex-grow: 0;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-left: 120px;
  }
`;

export const Disclaimer = styled.p`
  flex-grow: 1;
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
