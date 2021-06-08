import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { TooltipAnchorText } from 'components/InfoTooltip/Tooltip.style';

export const Row = styled.div`
  display: flex;
`;

export const FooterText = styled.div`
  margin: 0 0.5rem 0.75rem 0;
  max-width: 42.5rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const ButtonContainer = styled.div`
  flex-grow: 0;
  margin-left: auto;
`;

export const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
    align-items: center;
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
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
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
  padding: 0;
`;

export const DisclaimerWrapper = styled.div`
  margin-top: 1rem;
`;
