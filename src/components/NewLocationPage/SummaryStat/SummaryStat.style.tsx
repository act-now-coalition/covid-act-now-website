import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { GrayTitle, Chevron } from '../Shared/Shared.style';
import Box from '@material-ui/core/Box';

export const StatContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: column;
    align-items: unset;
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

export const StatInfoText = styled(Box)`
  display: grid;
  margin-right: ${({ theme }) => theme.spacing(3)}px;

  @media (min-width: ${materialSMBreakpoint}) {
    gap: ${({ theme }) => theme.spacing(1.5)}px;
  }
`;

export const SubLabelWrapper = styled.div`
  display: flex;
`;

export const SubLabel = styled(GrayTitle).attrs(props => ({
  as: 'span',
}))`
  ${props => props.theme.fonts.regularBook};
  line-height: 1.4;
  margin: 0;
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing(0.5)}px;
  text-transform: none;
  letter-spacing: 0;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-top: 0;
  }
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

// Alignment specific to desktop summary stat:
export const CondensedChevron = styled(Chevron)`
  transform: translateY(-1px);
  margin: auto 0 auto 0.4rem;
`;
