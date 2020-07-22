import styled from 'styled-components';

/**
 * The "homepage" share card isn't as tall as the location share card, so we
 * have to adapt the css styles.
 */

export const ShareCardWrapper = styled.div<{ isHomePage?: boolean }>`
  margin: ${props => (props.isHomePage ? '50px auto' : '35px auto')};
  width: 400px;
  height: 262px;
  transform: scale(1.75);
  transform-origin: top center;
`;

export const TitleWrapper = styled.div<{ isHomePage?: Boolean }>`
  margin-top: ${props => (props.isHomePage ? '68px' : '35px')};
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
