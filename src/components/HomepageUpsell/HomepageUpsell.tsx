import React, { Fragment } from 'react';
import { StyledButton, BodyText } from './HomepageUpsell.style';
import { EventAction, EventCategory } from 'components/Analytics';
import LabelWithChevron from 'components/NewLocationPage/Shared/LabelWithChevron';
import {
  SectionContentContainer,
  IconWrapper,
  TextContainer,
} from 'components/NewLocationPage/NotesBlock/NotesBlock.style';
import {
  Experiment,
  ExperimentID,
  Variant,
  VariantID,
} from 'components/Experiment';

const HomepageUpsell = () => {
  return (
    // Swap A and B before merging:
    <Experiment id={ExperimentID.HOMEPAGE_UPSELL}>
      <Variant id={VariantID.B}>
        <Fragment />
      </Variant>
      <Variant id={VariantID.A}>
        <StyledButton
          trackingCategory={EventCategory.EXPERIMENT}
          trackingAction={EventAction.CLICK}
          trackingLabel="Homepage upsell experiment"
          to="/"
        >
          <SectionContentContainer>
            <IconWrapper>Map image</IconWrapper>
            <TextContainer>
              <LabelWithChevron text="Risk &amp; vaccine tracker" />
              <BodyText>See COVID data for any U.S. location</BodyText>
            </TextContainer>
          </SectionContentContainer>
        </StyledButton>
      </Variant>
    </Experiment>
  );
};

export default HomepageUpsell;
