import styled from 'styled-components';

export const FixedAspectRatioContainer = styled.div<{ widthToHeight: number }>`
  position: relative;
  height: 0;
  padding-bottom: ${({ widthToHeight }) => 100 / widthToHeight}%;
  overflow: hidden;
`;

export const FixedAspectRatioInner = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
