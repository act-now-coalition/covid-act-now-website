import styled from 'styled-components';
import { Slider } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';
import { HomepageLocationScope } from 'common/utils/compare';

const returnSliderLabelColor = (
  filter: HomepageLocationScope,
  $isModal: boolean,
  $homepageScope: HomepageLocationScope,
) => {
  if (!$isModal) {
    if ($homepageScope === filter) return 'black';
    return `${COLOR_MAP.GRAY_BODY_COPY}`;
  }
  return 'white';
};

export const StyledSlider = styled(Slider)<{
  $isModal: boolean;
  $homepageScope: HomepageLocationScope;
}>`
  color: ${COLOR_MAP.BLUE};
  opacity: 1;

  span {
    &:nth-child(5) {
      color: ${props =>
        returnSliderLabelColor(
          HomepageLocationScope.COUNTY,
          props.$isModal,
          props.$homepageScope,
        )};
      font-weight: ${({ $homepageScope }) =>
        $homepageScope === HomepageLocationScope.COUNTY && 'bold'};
    }
    &:nth-child(7) {
      color: ${props =>
        returnSliderLabelColor(
          HomepageLocationScope.MSA,
          props.$isModal,
          props.$homepageScope,
        )};
      font-weight: ${({ $homepageScope }) =>
        $homepageScope === HomepageLocationScope.MSA && 'bold'};
    }
    &:nth-child(9) {
      color: ${props =>
        returnSliderLabelColor(
          HomepageLocationScope.STATE,
          props.$isModal,
          props.$homepageScope,
        )};
      font-weight: ${({ $homepageScope }) =>
        $homepageScope === HomepageLocationScope.STATE && 'bold'};
    }
  }
`;
