import styled from 'styled-components';
import { Chevron } from '../Shared/Shared.style';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const StatContent = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: column;
    justify-content: unset;
  }
`;

// put this somewhere in Shared:
export const StyledChevron = styled(Chevron)`
  transform: translateY(-2px);
  margin-left: 0.5rem;
`;

export const ValueWrapper = styled.div`
  display: flex;
`;

export const Value = styled.span`
  ${props => props.theme.fonts.monospaceBold};
  font-size: 1.125rem;
  margin: auto 0;

  @media (min-width: ${materialSMBreakpoint}) {
    font-size: 1.5rem;
  }
`;

export const SubLabelWrapper = styled.div`
  @media (min-width: ${materialSMBreakpoint}) {
    margin-left: 0.75rem;
  }
`;

export const SubLabel = styled.span`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  text-transform: uppercase;
  font-size: 1rem;
`;

export const MetricLabel = styled.span`
  ${props => props.theme.fonts.regularBookMidWeight};
  font-size: 1rem;
  margin-right: 0.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-right: 0;
  }
`;

export const Row = styled.div`
  display: flex;
  line-height: 1;
  align-items: center;

  &:first-child {
    flex-wrap: wrap;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    align-items: flex-start;

    &:first-child {
      margin-bottom: 0.75rem;
      flex-wrap: nowrap;
    }
  }
`;
