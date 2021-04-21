import { COLOR_MAP } from 'common/colors';
import styled from 'styled-components';
import { mobileBreakpoint } from 'assets/theme/sizes';
import { Chevron } from '../Shared/Shared.style';

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

export const BlockTitle = styled.h2`
  margin: 0 0 1.5rem;
  font-size: 1rem;
  line-height: 1.4;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  text-transform: uppercase;
`;

export const SparkLineSetContainer = styled.div`
  display: flex;
`;

// Specific pixel dimensions via mocks
export const SingleSparkLineContainer = styled.div`
  max-width: 90px;
  width: 100%;
  height: 78px;

  &:not(:last-of-type) {
    margin-right: 1rem;
  }

  @media (min-width: ${mobileBreakpoint}) {
    max-width: 96px;
  }

  @media (min-width: 1000px) {
    max-width: 120px;
    height: 90px;
  }

  @media (min-width: 1320px) {
    max-width: 96px;
  }
`;
