import styled from 'styled-components';

export const ScreenshotWrapper = styled.div`
  margin: 100px auto;
  width: 2400px;
  height: 1350px;
  overflow: hidden;
  /* Border is useful to verify layout, but will be included in screenshot if enabled. */
  /* border: 1px solid black; */
`;

export const Content = styled.div`
  transform: scale(2);
  transform-origin: top left;
  position: relative;
  display: inline-block;
  margin: 0;
  width: 1200px;
  height: 675px;
`;

export const Headers = styled.div`
  margin-left: 80px;
  margin-top: 60px;
`;

export const Location = styled.div`
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
`;

export const MetricName = styled.div`
  margin-top: 10px;
  text-transform: capitalize;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 36px;
  line-height: 36px;
  letter-spacing: -0.01em;
`;

export const LastUpdated = styled.div`
  margin-top: 10px;
  font-family: 'Source Code Pro';
  font-size: 13px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.5);
`;

export const ChartWrapper = styled.div`
  margin-left: 80px;
  margin-top: 30px;
  width: 1040px;
  height: 415px;

  /* HACK: We need the chart legend to use a variable-width font or it doesn't fit. */
  span {
    font-family: 'Roboto' !important;
  }
`;

export const LogoHolder = styled.div`
  position: absolute;
  right: 80px;
  top: 58px;
  font-family: 'Source Code Pro';
  font-size: 12px;
  line-height: 14px;
  color: rgba(0, 0, 0, 0.5);
  text-align: right;
`;

export const Url = styled.div`
  margin-left: 80px;
  margin-top: 45px;
  font-family: 'Source Code Pro';
  font-size: 13px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.5);
`;
