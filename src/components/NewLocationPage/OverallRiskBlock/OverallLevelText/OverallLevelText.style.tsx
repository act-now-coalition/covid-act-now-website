import styled from 'styled-components';
import { GrayTitle } from 'components/NewLocationPage/Shared/Shared.style';
import { InfoIcon } from 'components/InfoTooltip';
import { materialSMBreakpoint, smallPhoneBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  ${InfoIcon} {
    margin-left: 0.75rem;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Row = styled.div`
  display: flex;
`;

export const LevelLabel = styled.span`
  ${props => props.theme.fonts.monospaceBold};
  font-size: 1.4rem;
  text-transform: uppercase;
  line-height: 1;

  @media (min-width: ${smallPhoneBreakpoint}) {
    font-size: 1.5rem;
  }
`;

export const Title = styled(GrayTitle)`
  display: none;
  @media (min-width: ${materialSMBreakpoint}) {
    display: unset;
    margin-bottom: 0.5rem;
  }
`;
