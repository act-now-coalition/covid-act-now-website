import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { TooltipAnchorText } from 'components/InfoTooltip/Tooltip.style';

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
  margin: 0 0 0.75rem 0;
`;

export const SingleButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const ButtonContainer = styled.div`
  flex-grow: 0;
  margin-left: 0.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-left: 7.5rem;
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
    margin-right: 1.5rem;
  }
`;

export const IconWrapper = styled.div`
  margin-right: 0.75rem;
`;

export const AboutText = styled.span`
  line-height: 2.25rem;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 0.2rem;
  font-size: 0.9rem;

  @media (min-width: ${materialSMBreakpoint}) {
    line-height: 1.5rem;
    font-size: 1rem;
  }
`;

export const ModalButton = styled(TooltipAnchorText).attrs(props => ({
  as: 'button',
}))`
  cursor: pointer;
  background-color: transparent;
  border: none;
`;
