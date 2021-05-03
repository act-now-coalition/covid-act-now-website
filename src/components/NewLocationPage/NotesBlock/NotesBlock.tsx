import React from 'react';
import { SectionContainer } from 'components/NewLocationPage/Shared/Shared.style';
import LabelWithChevron from 'components/NewLocationPage/Shared/LabelWithChevron';
import {
  SectionContentContainer,
  IconWrapper,
  TextContainer,
  TextComponent,
  StyledBaseButton,
} from './NotesBlock.style';
import { EventAction, EventCategory } from 'components/Analytics';

interface NotesProps {
  icon: any;
  title: string;
  trackingCategory?: EventCategory;
  to?: string;
  href?: string;
}

const NotesBlock: React.FC<NotesProps> = ({
  icon,
  title,
  trackingCategory = EventCategory.NONE,
  children,
  ...props
}) => {
  const usePointer = props.to || props.href ? 'pointer' : 'default';

  return (
    <SectionContainer>
      <StyledBaseButton
        trackingCategory={trackingCategory}
        trackingAction={EventAction.CLICK}
        trackingLabel={`Header notes block: ${title}`}
        style={{ cursor: usePointer }}
        {...props}
      >
        <SectionContentContainer>
          <IconWrapper>{icon}</IconWrapper>
          <TextContainer>
            <LabelWithChevron text={title} />
            <TextComponent>{children}</TextComponent>
          </TextContainer>
        </SectionContentContainer>
      </StyledBaseButton>
    </SectionContainer>
  );
};

export default NotesBlock;
