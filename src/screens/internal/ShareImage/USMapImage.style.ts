import styled from 'styled-components';

export const USMapWrapper = styled.div`
  margin: auto;
  width: 515px;
  transform: scale(2);
  transform-origin: top center;

  /* HACK to remove box-shadow from SocialLocationPreview component. */
  div:first-child {
    box-shadow: none;
  }
`;
