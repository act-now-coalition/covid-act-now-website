import React from 'react';
import Grid from '@material-ui/core/Grid';
import { modalContent } from 'cms-content/recommendations';
import * as Style from './RecommendModal.style';
import SourceTabs, { SourceLevel } from './RecommendTabs';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import Hidden from '@material-ui/core/Hidden';

const { federalTaskForce, harvard } = modalContent;

const sources = [
  {
    ...federalTaskForce,
    trackLabel: 'Fed Task Force',
    linkLabel: 'fed-levels',
    levels: [
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
    ],
  },
  {
    ...harvard,
    trackLabel: 'Harvard',
    linkLabel: 'harvard-levels',
    levels: [
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
    ],
  },
];

const RecommendModalBody: React.FC = () => {
  function onSelectLevel(level: SourceLevel, source: string) {
    const trackLabel = `${source}: ${level.label}`;
    trackEvent(EventCategory.RECOMMENDATIONS, EventAction.SELECT, trackLabel);
  }

  return (
    <React.Fragment>
      <Hidden smUp>
        <Style.ModalContents>
          {sources.map((source, i) => (
            <Style.ContentItem key={`link-${i}`}>
              <Style.ContentLink href={`#${source.linkLabel}`}>
                {source.sourceName}
              </Style.ContentLink>
            </Style.ContentItem>
          ))}
        </Style.ModalContents>
      </Hidden>
      <div>
        {sources.map((source, i) => (
          <Style.SourceContainer key={`source-${i}`}>
            <Style.SourceCopyContainer item sm={6} xs={12} key="intro">
              <Style.SourceTitle id={`${source.linkLabel}`}>
                {source.sourceName}
              </Style.SourceTitle>
              <Style.SourceIntro
                source={source.description}
                linkTarget="_blank"
              />
            </Style.SourceCopyContainer>
            <Grid item sm={6} xs={12} key="levels">
              <SourceTabs
                levels={source.levels}
                onSelectLevel={(level: SourceLevel) =>
                  onSelectLevel(level, source.trackLabel)
                }
              />
            </Grid>
          </Style.SourceContainer>
        ))}
      </div>
    </React.Fragment>
  );
};

export default RecommendModalBody;
