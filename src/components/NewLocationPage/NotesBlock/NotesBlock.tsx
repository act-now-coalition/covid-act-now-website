import React from 'react';
import { SectionContainer } from 'components/NewLocationPage/Shared/Shared.style';
import LabelWithChevron from 'components/NewLocationPage/Shared/LabelWithChevron';
import {
  SectionContentContainer,
  IconWrapper,
  TextContainer,
  TextComponent,
} from './NotesBlock.style';

const NotesBlock: React.FC<{ icon: any; title: string }> = ({
  icon,
  title,
  children,
}) => {
  return (
    <SectionContainer>
      <SectionContentContainer>
        <IconWrapper>{icon}</IconWrapper>
        <TextContainer>
          <LabelWithChevron text={title} />
          <TextComponent>{children}</TextComponent>
        </TextContainer>
      </SectionContentContainer>
    </SectionContainer>
  );
};

export default NotesBlock;
