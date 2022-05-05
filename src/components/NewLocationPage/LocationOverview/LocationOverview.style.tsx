import styled, { css } from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint, mobileBreakpoint } from 'assets/theme/sizes';
import { SectionContainer } from '../Shared/Shared.style';
import { Chevron } from '../Shared/Shared.style';

// Adding 100px to the largest mobile breakpoint to minimize the wrapping of metric names
const gridBreakpoint = '900px';

// This section container is styled a bit differently than the rest.
// Removing padding to allow for full width section borders and
// proper styling of the mobile share button at the bottom of the container
export const OverviewSectionContainer = styled(SectionContainer)`
  padding: 0;

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 1.75rem;
  }

  @media (min-width: ${mobileBreakpoint}) {
    padding: 2rem 2.5rem;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-areas: 'level' 'metric1' 'metric2' 'metric3' 'metricVax' 'progress';
  row-gap: 1.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      'level level progress progress'
      'metric1 metric2 metric3 metricVax';
    column-gap: 2rem;
    row-gap: 2.25rem;
  }

  @media (min-width: ${gridBreakpoint}) {
    grid-template-areas:
      'level level level progress'
      'metric1 metric2 metric3 metricVax';
  }
`;

const ItemBasePadding = css`
  padding: 0 1.25rem 0 1.25rem;

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 0;
  }
`;

const ClickableItemStyles = css`
  ${ItemBasePadding};
  cursor: pointer;
  &:hover {
    ${Chevron} {
      transform: translate(6px, -1px);
      transition: transform 0.06s ease-in-out;
    }
  }
`;

export const GridItemLevel = styled.div`
  ${ItemBasePadding};
  grid-area: level;
  padding-bottom: 0.5rem;
  padding-top: 1.25rem;
  justify-self: center;

  @media (min-width: ${materialSMBreakpoint}) {
    justify-self: inherit;
  }
`;

export const GridItemProgress = styled.div`
  ${ClickableItemStyles};
  grid-area: progress;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${COLOR_MAP.GREY_1};

  @media (min-width: ${materialSMBreakpoint}) {
    padding-bottom: 0;
    border-bottom: none;
    margin-top: auto;
  }
`;

export const GridItemMetric1 = styled.div`
  ${ClickableItemStyles};
  grid-area: metric1;
  cursor: pointer;
`;

export const GridItemMetric2 = styled.div`
  ${ClickableItemStyles};
  grid-area: metric2;
`;

export const GridItemMetric3 = styled.div`
  ${ClickableItemStyles};
  grid-area: metric3;
`;

export const GridItemMetricVax = styled.div`
  ${ClickableItemStyles};
  grid-area: metricVax;
  padding-top: 1.5rem;
  border-top: 1px solid ${COLOR_MAP.GREY_1};

  @media (min-width: ${materialSMBreakpoint}) {
    padding-top: 0;
    border-top: none;
  }
`;
