import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import ShareBlock from 'components/ShareBlock/ShareBlock';
import { Heading1, Heading2, Paragraph } from 'components/Markdown';
import { Placeholder, PageContent } from './National.style';

const National: React.FC = () => {
  return (
    <Fragment>
      {/* Meta tags */}
      <PageContent>
        <Heading1>Title</Heading1>
        <Paragraph>Intro paragraph</Paragraph>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <Placeholder>chart daily new cases</Placeholder>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Placeholder>chart deaths</Placeholder>
          </Grid>
        </Grid>
        <Heading2>State by state</Heading2>
        <Paragraph>Intro paragraph</Paragraph>
        <Placeholder>map</Placeholder>
        <Heading2>Compare states</Heading2>
        <Paragraph>Intro paragraph</Paragraph>
        <Placeholder>compare table</Placeholder>
      </PageContent>
      <ShareBlock />
    </Fragment>
  );
};

export default National;
