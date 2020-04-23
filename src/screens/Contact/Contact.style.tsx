import styled from 'styled-components';
import { COLORS } from 'enums';
import palette from 'assets/theme/palette';

export const Wrapper = styled.div`
  background-color: white;
  min-height: calc(100vh - 64px);
`;

export const Content = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 1rem 0;
  h1,
  h5,
  p {
    margin-bottom: 24px;
  }

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

export const EmailButton = styled.a`
  cursor: pointer;
  display: inline-block;
  height: 2.5rem;
  border-radius: 4px;
  appearance: none;
  font-size: 0.875rem;
  padding: 0.25rem 1.25rem;
  line-height: 2rem;
  text-decoration: none;
  transition: 0.3s ease background-color;
  background-color: ${palette.secondary.main};
  color: ${palette.white};
  font-weight: 700;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;

  &:hover {
    background-color: ${palette.secondary.dark};
  }
`;

export const NavLinks = styled.div``;

export const NavLink = styled.a`
  margin-bottom: 0.5rem;
  display: block;
`;
