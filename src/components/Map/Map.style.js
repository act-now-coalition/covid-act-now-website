import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { COLOR_MAP } from 'common/colors';

export const USMapWrapper = styled.div`
  position: relative;
  padding-bottom: 70%;
  top: ${props => (props.condensed ? '-16px' : '-45px')};
  width: 100%;

  @media (max-width: 600px) {
    top: -15px;
  }
`;

export const USCountyMapWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const USStateMapWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  path:hover {
    opacity: ${props => (props.showCounties ? 0.25 : 0.8)};
    fill: ${props => (props.showCounties ? '#fff' : 'inherit')};
    cursor: pointer;
  }
`;

export const MapInstructions = styled(Typography)`
  text-align: center;
  margin: ${props =>
    props.$isMiniMap ? '-1rem 1rem 1rem 1rem' : '1rem 1rem 2.5rem'};
  font-size: 0.875rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const MobileLineBreak = styled.br`
  @media (min-width: 600px) {
    display: none;
  }
`;
