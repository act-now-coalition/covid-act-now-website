import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: white;
  padding: 1rem 2rem;
  min-height: calc(100vh - 64px);

  // HACK: Material-UI adds padding to the body tag when a Select combo box is
  // open (see https://stackoverflow.com/q/60682426), which causes all the
  // graphs to get resized and causes the page to lag. So force the div width to
  // always match the viewport.
  width: 100vw;
`;
