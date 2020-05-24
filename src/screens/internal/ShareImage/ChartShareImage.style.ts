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

export const Title = styled.div`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 24px;
  line-height: 18px;
  text-transform: capitalize;
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
  margin-left: 60px;
  margin-top: 25px;
  width: 495px;
  height: 225px;

  /* HACK: We need the chart legend to use a variable-width font or it doesn't fit. */
  span {
    font-family: 'Roboto' !important;
  }
`;

export const LogoHolder = styled.div`
  position: absolute;
  right: 55px;
  top: 20px;
`;
