import styled from 'styled-components';
import { Slider } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';
import { HomepageLocationScope } from 'common/utils/compare';

const returnSliderLabelColor = (
  filter: HomepageLocationScope,
  $isModal: boolean,
  homepageScope: HomepageLocationScope,
) => {
  if (!$isModal) {
    if (homepageScope === filter) return 'black';
    return `${COLOR_MAP.GRAY_BODY_COPY}`;
  }
  return 'white';
};

export const StyledSlider = styled(Slider)<{
  $isModal: boolean;
  homepageScope: HomepageLocationScope;
}>`
  color: ${COLOR_MAP.BLUE};
  opacity: 1;

  span {
    &:nth-child(5) {
      color: ${props =>
        returnSliderLabelColor(
          HomepageLocationScope.COUNTIES,
          props.$isModal,
          props.homepageScope,
        )};
      font-weight: ${({ homepageScope }) =>
        homepageScope === HomepageLocationScope.COUNTIES && 'bold'};
    }
    &:nth-child(7) {
      color: ${props =>
        returnSliderLabelColor(
          HomepageLocationScope.CITIES,
          props.$isModal,
          props.homepageScope,
        )};
      font-weight: ${({ homepageScope }) =>
        homepageScope === HomepageLocationScope.CITIES && 'bold'};
    }
    &:nth-child(9) {
      color: ${props =>
        returnSliderLabelColor(
          HomepageLocationScope.STATES,
          props.$isModal,
          props.homepageScope,
        )};
      font-weight: ${({ homepageScope }) =>
        homepageScope === HomepageLocationScope.STATES && 'bold'};
    }
  }
`;
