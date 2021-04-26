import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import BaseButton from 'components/ButtonSystem/BaseButton/BaseButton';

export const SectionContentContainer = styled.div`
  display: flex;
`;

export const TextContainer = styled.div``;

export const TextComponent = styled.p`
  color: ${COLOR_MAP.GREY_4};
  margin: 0.25rem 0 0;
`;

export const IconWrapper = styled.div`
  margin-right: 10px;
`;

export const StyledBaseButton = styled(BaseButton)`
  font-weight: inherit;
  font-size: inherit;
  text-transform: none;
  letter-spacing: 0;
`;
