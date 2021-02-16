import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { COLORS } from 'common';

export const Container = styled.div`
  border: 1px solid ${COLORS.LIGHTGRAY};
  border-radius: 4px;
  max-width: 420px;
  width: 100%;
  margin: auto;
`;

export const BannerSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &:first-child {
    background-color: #fafafa;
  }

  &:last-child {
    padding: 0.5rem;
  }

  @media (min-width: 600px) {
    &:last-child {
      flex-direction: row;
      padding: 0;
    }
  }
`;

export const CountdownWrapper = styled.div`
  display: flex;
  margin-top: 1.75rem;
`;

export const CountSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  text-align: center;

  &:not(:last-child) {
    margin-right: 0.75rem;
  }
`;

export const Count = styled.span`
  font-size: 1.5rem;
  font-family: Source Code Pro;
  font-weight: 700;
`;

export const Measure = styled.span`
  text-transform: uppercase;
  font-size: 0.75rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const SubCopy = styled.p`
  font-size: 1rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  margin: 0.75rem 0 1rem;
  font-weight: 500;
`;

export const FlagIcon = styled.img`
  display: flex;
  margin: auto;
  margin-bottom: -1rem;
  border-radius: 2px;
  width: 60px;
`;

export const StyledLink = styled.a`
  color: ${COLOR_MAP.BLUE};
  text-decoration: none;
  margin: 0.5rem 0.75rem;
  font-weight: 500;

  @media (min-width: 600px) {
    margin: 1.25rem 0.75rem;
  }
`;
