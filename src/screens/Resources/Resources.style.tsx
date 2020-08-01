import styled from 'styled-components';
import { COLORS } from 'common';

export const Wrapper = styled.div`
  background-color: white;
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

export const Header = styled.div`
  background-color: ${COLORS.LIGHTGRAY};
`;

export const GetStartedBox = styled.div`
  background-color: rgba(242, 242, 242, 0.4);
  padding: 24px;
  margin-bottom: 24px;

  h3 {
    margin-top: 0;
  }
`;

export const GetStartedList = styled.ol`
  padding-inline-start: 24px;
  margin-block-end: 0;
  li {
    margin-bottom: 24px;
  }
  li:last-child {
    margin-bottom: 0;
  }
`;

export const SimulatorTab = styled.span<{ color: string }>`
  font-weight: bold;
  color: ${props => props.color};
`;

export const ImageContainer = styled.div`
  img {
    width: 100%;
  }
  margin-bottom: 24px;
`;
