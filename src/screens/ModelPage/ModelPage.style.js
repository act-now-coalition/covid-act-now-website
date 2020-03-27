import styled from 'styled-components';
import Loader from 'react-loader-spinner';

export const Wrapper = styled.div``;

export const Content = styled.div`
  text-align: center;
  max-width: 900px;
  padding: 1rem;
  margin: auto;
  '@media (min-width:600px)': {
    padding: 0;
  }
`;

export const ShareSpacer = styled.div`
  padding-right: 32px;
`;

export const ShareContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StyledLoader = styled(Loader)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;
