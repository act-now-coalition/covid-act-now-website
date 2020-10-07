import React from 'react';
import Grid from '@material-ui/core/Grid';
import { modalContent } from 'cms-content/recommendations';
import { MarkdownBody } from 'components/Markdown';

const { federalTaskForce, harvard } = modalContent;

const RecommendModalBody: React.FC = () => {
  return (
    <React.Fragment>
      <h2>{modalContent.header}</h2>
      <Grid container spacing={2}>
        <Grid key="fed" item sm={6} xs={12}>
          <h3>{federalTaskForce.sourceName}</h3>
          <MarkdownBody source={federalTaskForce.description} />
        </Grid>
        <Grid key="harvard" item sm={6} xs={12}>
          <h3>{harvard.sourceName}</h3>
          <MarkdownBody source={harvard.description} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default RecommendModalBody;
