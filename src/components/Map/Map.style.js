import styled from 'styled-components';

export const USMapWrapper = styled.div`
  position: relative;
  padding-bottom: 70%;
  top: -45px;
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
    opacity: 0.1;
    background-color: #cccccc;
    fill: unset;
    cursor: pointer;
  }
}

`;
