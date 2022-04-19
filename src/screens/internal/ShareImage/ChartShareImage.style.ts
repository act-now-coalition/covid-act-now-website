import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  transform: scale(2);
  transform-origin: top left;
  width: 600px;
  height: 315px;
`;

export const Headers = styled.div`
  margin-left: 50px;
  margin-top: 20px;
`;

export const Title = styled.h1`
  font-size: 18px;
  line-height: 1.05;
  font-family: 'Roboto';
  text-transform: capitalize;
  width: 400px;
  margin-bottom: 0;
`;

export const ExploreTitle = styled(Title)`
  font-size: 18px;
  line-height: 19px;
  text-transform: capitalize;
  height: 75px;
  overflow: hidden;
`;

export const Subtitle = styled.div`
  margin-top: 5px;
  font-family: 'Source Code Pro';
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;
  color: #bcbcbc;
`;

export const ChartWrapper = styled.div`
  position: absolute;
  left: 60px;
  top: 88px;
  width: 495px;
  height: 225px;

  /* HACK: We need the chart legend to use a variable-width font or it doesn't fit. */
  span {
    font-family: 'Roboto' !important;
  }
`;

export const ExploreChartWrapper = styled(ChartWrapper)`
  left: 20px;
  width: 535px;
`;

export const LogoHolder = styled.div`
  position: absolute;
  right: 55px;
  top: 20px;
`;
