import styled from 'styled-components';

export const USMapWrapper = styled.div``;

export const USStateMapWrapper = styled.div<{
  $showCounties: boolean;
}>`
  path:hover {
    fill-opacity: ${props => (props.$showCounties ? 0.25 : 0.8)};
    fill: ${props => (props.$showCounties ? '#fff' : undefined)};
    cursor: pointer;
  }
`;

export const MobileLineBreak = styled.br`
  @media (min-width: 600px) {
    display: none;
  }
`;
