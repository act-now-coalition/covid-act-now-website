import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: calc(100vh - 64px);
`;

export const Content = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 1rem 0 3rem;

  @media (max-width: 932px) {
    padding: 1rem;
  }
`;

export const ScreenshotWrapper = styled.div`
  width: 1200px;
  height: 630px;
  background-color: black;
  color: white;
  overflow: hidden;
`;

/**
 * The "homepage" share card isn't as tall as the location share card, so we
 * have to adapt the css styles.
 */
export const ShareCardWrapper = styled.div<{ isHomePage?: boolean }>`
  margin: 50px auto;
  width: 400px;
  height: 262px;
  transform: scale(${props => (props.isHomePage ? 2.5 : 2.0)});
  transform-origin: top center;
`;

export const TitleWrapper = styled.div`
  margin-top: 68px;
  height: 48px;
  line-height: 48px;
  font-size: 48px;
  text-align: center;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: bold;
`;

export const LastUpdatedWrapper = styled.div`
  height: 28px;
  font-size: 28px;
  line-height: 28px;
  text-align: center;
  font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  margin-top: 18px;
`;
