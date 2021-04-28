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
  redirectUrl?: string;
  trackingCategory?: EventCategory;
}

const NotesBlock: React.FC<NotesProps> = ({
  icon,
  title,
  redirectUrl,
  trackingCategory = EventCategory.NONE,
  children,
}) => {
  // If there is no href/to/onClick prop passed,
  // BaseButton knows to render as a span and not a button
  const buttonProps = redirectUrl ? { href: redirectUrl } : {};

  return (
    <SectionContainer>
      <StyledBaseButton
        trackingCategory={trackingCategory}
        trackingAction={EventAction.CLICK}
        trackingLabel={`Header notes block: ${title}`}
        style={{ cursor: redirectUrl ? 'pointer' : 'default' }}
        {...buttonProps}
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
