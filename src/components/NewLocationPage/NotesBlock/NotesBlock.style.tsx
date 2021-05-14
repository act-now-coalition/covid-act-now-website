import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import BaseButton from 'components/ButtonSystem/BaseButton/BaseButton';
import { Chevron } from '../Shared/Shared.style';

export const SectionContentContainer = styled.div`
  display: flex;
`;

export const TextContainer = styled.div`
  font-size: 1rem;
`;

export const TextComponent = styled.p`
  color: ${COLOR_MAP.GREY_4};
  margin: 0.7rem 0 0;
`;

export const IconWrapper = styled.div`
  margin-right: 1rem;
`;

export const StyledBaseButton = styled(BaseButton)`
  font-weight: inherit;
  font-size: inherit;
  text-transform: none;
  letter-spacing: 0;
  padding: 0;

  &:hover {
    background-color: transparent;
    ${Chevron} {
      transform: translate(6px, 5.5px);
      transition: transform 0.06s ease-in-out;
    }
  }
`;
