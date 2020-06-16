import styled from 'styled-components';
import { COLORS } from 'common';
import { TeamList } from 'screens/About/About';

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

export const TextContent = styled.div`
  max-width: 600px;
`;

export const ActiveAlumniButtonContainer = styled.div`
  display: flex;
  width: 150px;
  border: 1px solid black;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
`;

export const ActiveAlumniButton = styled.div<{
  teamList?: TeamList;
}>`
  width: 50%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  padding: 0.1rem;

  &:first-child {
    border-right: 1px solid black;
    background-color: ${({ teamList }) =>
      teamList === TeamList.Active && 'rgba(59,188,230,.5)'};
  }

  &:last-child {
    border-right: 1px solid black;
    background-color: ${({ teamList }) =>
      teamList === TeamList.Alumni && 'rgba(59,188,230,.5)'};
  }
`;
