import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 1rem 2rem 2rem;

  '@media (min-width:600px)': {
    padding: '3rem',
  },
`;

export const Content = styled.div`
  max-width: ${props => (props.wide ? '1100px' : '900px')};
  margin: auto;
`;

export const MapTitle = styled.div`
  padding: 1.5rem 1rem 1rem;
  text-align: center;
  font-weight: bold;

  @media (min-width: 600px) {
    padding: 2rem 1rem 1rem;
  }
`;

export const MapTitleDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    width: 50%;
    height: 1px;
    background: #c4c4c4;
  }

  span {
    padding: 0 2rem;
  }
`;
