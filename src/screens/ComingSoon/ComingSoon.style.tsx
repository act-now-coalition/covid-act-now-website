import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  p {
    position: absolute;
    color: white;
    padding: 200px;
    font-weight: 500;
  }
`;

export const Layer = styled.div`
  background-color: rgba(248, 247, 216, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const BackgroundImage = styled.img`
  position: fixed;
  top: 150px;
  min-width: 110vw;
  min-height: 100vh;
  filter: blur(10px) grayscale(90%);
`;
