import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { GrayTitle } from '../Shared/Shared.style';

export const StatContent = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: column;
    justify-content: unset;
  }
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
  display: flex;
  align-items: baseline;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-left: 0.75rem;
  }
`;

export const SubLabel = styled(GrayTitle).attrs(props => ({
  as: 'span',
}))`
  line-height: 1;
  margin: 0;
`;

export const MetricLabel = styled.span`
  ${props => props.theme.fonts.regularBookMidWeight};
  font-size: 1rem;
  margin-right: 0.5rem;
  letter-spacing: 0;
  line-height: 1.2;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-right: 0;
  }
`;

export const Row = styled.div`
  display: flex;
  line-height: 1;
  align-items: baseline;
  align-content: flex-end;

  &:first-child {
    flex-wrap: wrap;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    &:first-child {
      margin-bottom: 0.75rem;
      flex-wrap: nowrap;
    }
    &:last-child {
      align-items: center;
    }
  }
`;
