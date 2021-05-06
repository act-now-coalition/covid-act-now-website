import React, { Fragment } from 'react';
import {
  StyledButton,
  BodyText,
  MapWrapper,
  Wrapper,
} from './HomepageUpsell.style';
import { EventAction, EventCategory } from 'components/Analytics';
import Map from 'components/Map/Map';
import LabelWithChevron from 'components/NewLocationPage/Shared/LabelWithChevron';
import {
  Experiment,
  ExperimentID,
  Variant,
  VariantID,
} from 'components/Experiment';
import Slide from '@material-ui/core/Slide';

const HomepageUpsell: React.FC<{ showHomepageUpsell: boolean }> = ({
  showHomepageUpsell,
}) => {
  return (
    // Swap A and B before merging:
    <Experiment id={ExperimentID.HOMEPAGE_UPSELL}>
      <Variant id={VariantID.B}>
        <Fragment />
      </Variant>
      <Variant id={VariantID.A}>
        {showHomepageUpsell && (
          <Slide in={showHomepageUpsell} direction="up">
            <Wrapper>
              <StyledButton
                trackingCategory={EventCategory.ENGAGEMENT}
                trackingAction={EventAction.NAVIGATE}
                trackingLabel="Homepage upsell experiment"
                to="/"
              >
                <MapWrapper>
                  <Map
                    onClick={undefined}
                    hideLegend={true}
                    hideLegendTitle={true}
                    hideInstructions={true}
                    showCounties={false}
                  />
                </MapWrapper>
                <div>
                  <LabelWithChevron text="Risk &amp; vaccine tracker" />
                  <BodyText>See COVID data for any U.S. location</BodyText>
                </div>
              </StyledButton>
            </Wrapper>
          </Slide>
        )}
      </Variant>
    </Experiment>
  );
};

export default HomepageUpsell;
