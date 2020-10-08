import React from 'react';
import Grid from '@material-ui/core/Grid';
import { modalContent } from 'cms-content/recommendations';
import * as Style from './RecommendModal.style';
import SourceTabs from './RecommendTabs';

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

const RecommendModalBody: React.FC = () => {
  return (
    <React.Fragment>
      <Style.Title>{modalContent.header}</Style.Title>
      <Grid container spacing={2}>
        <Grid key="fed" item sm={6} xs={12}>
          <Style.SourceTitle>{federalTaskForce.sourceName}</Style.SourceTitle>
          <Style.SourceIntro source={federalTaskForce.description} />
          <SourceTabs levels={fedLevels} />
        </Grid>
        <Grid key="harvard" item sm={6} xs={12}>
          <h3>{harvard.sourceName}</h3>
          <Style.SourceIntro source={harvard.description} />
          <SourceTabs levels={harvardLevels} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default RecommendModalBody;
