import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const USMapWrapper = styled.div`
  position: relative;
  top: ${props => (props.condensed ? '-16px' : '-45px')};
  width: 100%;

  @media (max-width: 600px) {
    top: -15px;
  }
`;

export const USCountyMapWrapper = styled.g`
  pointer-events: none;
  fill: none;
  fill-opacity: 0;
  stroke: white;
  stroke-width: 0.5;
  stroke-opacity: 0.3;
`;

export const USStateMapWrapper = styled.g`
  path {
    stroke-width: 2px;
  }
  path:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export const MapInstructions = styled(Typography)`
  text-align: center;
  margin: 1rem 1rem -0.5rem;
  font-size: 0.875rem;

  @media (min-width: 600px) {
    margin-top: 2rem;
  }
`;

export const MobileLineBreak = styled.br`
  @media (min-width: 600px) {
    display: none;
  }
`;
