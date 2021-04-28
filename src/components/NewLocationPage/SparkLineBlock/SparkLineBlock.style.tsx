import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Chevron } from '../Shared/Shared.style';
import { mobileBreakpoint } from 'assets/theme/sizes';

export const ChartTitleWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 0.5rem;

  ${Chevron} {
    transform: none;
    margin-left: 0.25rem;
  }
`;

export const ChartTitle = styled.span`
  ${props => props.theme.fonts.regularBookMidweight};
  font-size: 1rem;
  max-width: 65px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// Specific pixel dimensions via mocks
export const SingleSparkLineContainer = styled.div`
  width: 90px;
  height: 48px;

  @media (min-width: ${mobileBreakpoint}) {
    width: 96px;
  }

  @media (min-width: 1000px) {
    width: 120px;
    height: 60px;
  }

  @media (min-width: 1320px) {
    width: 96px;
    height: 48px;
  }
`;

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:not(:last-of-type) {
    margin-right: 1rem;
  }

  &:hover {
    ${Chevron} {
      transform: translateX(6px);
      transition: transform 0.06s ease-in-out;
    }
  }
`;
