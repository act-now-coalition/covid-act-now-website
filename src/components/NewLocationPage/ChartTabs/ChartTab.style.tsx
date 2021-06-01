import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Tab = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 10.5rem;

  &:hover {
    color: ${COLOR_MAP.BLACK};
    font-weight: 500;
    border-bottom: 3px solid ${COLOR_MAP.BLACK};
  }
`;

export const TabTitle = styled.div`
  text-transform: uppercase;
  font-size: 0.8rem;
  line-height: 1;
  color: ${COLOR_MAP.GREY_4};
  margin-bottom: 0.5rem;
`;

export const TabContent = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

export const MetricSubLabel = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: ${COLOR_MAP.GREY_4};

  @media (min-width: ${materialSMBreakpoint}) {
    color: ${COLOR_MAP.GREY_3};
    padding: 0.5rem 0 0 0.5rem;
  }
`;
