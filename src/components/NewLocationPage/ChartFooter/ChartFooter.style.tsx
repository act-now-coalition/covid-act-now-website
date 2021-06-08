import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { TooltipAnchorText } from 'components/InfoTooltip/Tooltip.style';

export const Row = styled.div`
  display: flex;
`;

export const FooterText = styled.div`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  margin-bottom: 0.75rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-right: 3rem;
    margin-bottom: 0;
  }
`;

export const ButtonContainer = styled.div`
  margin-left: auto;
`;

export const AboutText = styled.span`
  ${props => props.theme.fonts.regularBook};
  font-size: 0.9rem;

  @media (min-width: ${materialSMBreakpoint}) {
    line-height: 1.4rem;
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

export const Wrapper = styled.div`
  margin-top: 1rem;
`;

export const OverrideDisclaimer = styled.p`
  margin: 1rem 0 0;
`;
