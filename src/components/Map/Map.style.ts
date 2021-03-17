import { Geography } from 'react-simple-maps';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { COLOR_MAP } from 'common/colors';

export const USMapWrapper = styled.div``;

export const MapInstructions = styled(Typography)`
  text-align: center;
  font-size: 0.875rem;
  margin: 1rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const MobileLineBreak = styled.br`
  @media (min-width: 600px) {
    display: none;
  }
`;

export const StyledGeography = styled(Geography)<{ $showCounties: boolean }>`
  fill-opacity: ${props => (props.$showCounties ? 0 : 1)};
  &:hover {
    fill-opacity: ${props => (props.$showCounties ? 0.25 : 0.8)};
    fill: ${props => (props.$showCounties ? '#fff' : undefined)};
    cursor: pointer;
  }
`;

export const StyledRect = styled.rect`
  &:hover {
    fill-opacity: 0.8;
    cursor: pointer;
  }
`;
