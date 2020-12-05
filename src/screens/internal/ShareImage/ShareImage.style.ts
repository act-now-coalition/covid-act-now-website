import styled from 'styled-components';

export const ScreenshotWrapper = styled.div`
  margin: 100px auto;
  width: 1200px;
  height: 630px;
  overflow: hidden;
  background-color: white;
`;

export const DarkScreenshotWrapper = styled(ScreenshotWrapper)`
  background-color: black;
  color: white;
`;
