import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Tab = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 8rem;
`;

// TODO: Figure out transforming color to black on hover or click?
export const TabTitle = styled.div`
  text-transform: uppercase;
  color: ${COLOR_MAP.GREY_4};
  margin-bottom: 0.5rem;
`;

export const TabContent = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

export const MetricSubLabel = styled.div`
  text-transform: uppercase;
  color: ${COLOR_MAP.GREY_4};
`;
