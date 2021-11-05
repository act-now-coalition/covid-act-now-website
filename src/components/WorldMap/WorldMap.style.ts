import styled from 'styled-components';
import { Geography } from 'react-simple-maps';

export const Container = styled.div`
  border: solid 1px #ddd;
`;

export const NationShape = styled(Geography)<{ $fillColor: string }>`
  fill: ${props => props.$fillColor};
  stroke: #fff;
  stroke-width: 1;

  &:hover {
    fill-opacity: 0.6;
  }
`;
