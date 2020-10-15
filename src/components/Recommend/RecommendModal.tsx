import React from 'react';
import Grid from '@material-ui/core/Grid';
import { modalContent } from 'cms-content/recommendations';
import * as Style from './RecommendModal.style';
import SourceTabs, { SourceLevel } from './RecommendTabs';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { FedLevel, HarvardLevel } from 'cms-content/recommendations';
const { federalTaskForce, harvard } = modalContent;

// TODO: Update the CMS structure to include a hex color for the tabs and
// a title for them
const fedLevels = [
  {
    color: 'green',
    label: 'Green',
    body: federalTaskForce.levels[0].content,
  },
  {
    color: 'yellow',
    label: 'Yellow',
    body: federalTaskForce.levels[1].content,
  },
  {
    color: 'red',
    label: 'Red',
    body: federalTaskForce.levels[2].content,
  },
];

const harvardLevels = [
  {
    color: 'green',
    label: 'Green',
    body: harvard.levels[0].content,
  },
  {
    color: 'yellow',
    label: 'Yellow',
    body: harvard.levels[1].content,
  },
  {
    color: 'orange',
    label: 'Orange',
    body: harvard.levels[2].content,
  },
  {
    color: 'red',
    label: 'Red',
    body: harvard.levels[3].content,
  },
];

const fedTabIndex = {
  [FedLevel.GREEN]: 0,
  [FedLevel.YELLOW]: 1,
  [FedLevel.RED]: 2,
};

const harvardTabIndex = {
  [HarvardLevel.GREEN]: 0,
  [HarvardLevel.YELLOW]: 1,
  [HarvardLevel.ORANGE]: 2,
  [HarvardLevel.RED]: 3,
};

const RecommendModalBody: React.FC<{
  fedLevel: FedLevel | null;
  harvardLevel: HarvardLevel | null;
}> = ({ fedLevel, harvardLevel }) => {
  function onSelectLevel(level: SourceLevel, source: string) {
    const trackLabel = `${source}: ${level.label}`;
    trackEvent(EventCategory.RECOMMENDATIONS, EventAction.SELECT, trackLabel);
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid key="fed" item sm={6} xs={12}>
          <Style.SourceTitle>{federalTaskForce.sourceName}</Style.SourceTitle>
          <Style.SourceIntro
            source={federalTaskForce.description}
            linkTarget="_blank"
          />
          <SourceTabs
            levels={fedLevels}
            onSelectLevel={(level: SourceLevel) =>
              onSelectLevel(level, 'Fed Task Force')
            }
            initialLevel={fedLevel ? fedTabIndex[fedLevel] : 0}
          />
        </Grid>
        <Grid key="harvard" item sm={6} xs={12}>
          <h3>{harvard.sourceName}</h3>
          <Style.SourceIntro source={harvard.description} linkTarget="_blank" />
          <SourceTabs
            levels={harvardLevels}
            onSelectLevel={(level: SourceLevel) =>
              onSelectLevel(level, 'Harvard')
            }
            initialLevel={harvardLevel ? harvardTabIndex[harvardLevel] : 0}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default RecommendModalBody;
