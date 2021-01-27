import React from 'react';
import Grid from '@material-ui/core/Grid';
import { modalContent } from 'cms-content/recommendations';
import * as Style from './RecommendModal.style';
import SourceTabs, { SourceLevel } from './RecommendTabs';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { FedLevel, HarvardLevel } from 'cms-content/recommendations';
import Hidden from '@material-ui/core/Hidden';

const { federalTaskForce } = modalContent;

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
  fedModalLocationCopy: string;
  harvardModalLocationCopy: string;
}> = ({
  fedLevel,
  harvardLevel,
  fedModalLocationCopy,
  harvardModalLocationCopy,
}) => {
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
        {sources.map((source, i) => {
          const locationCopyToUse =
            source.sourceName === 'White House Coronavirus Task Force'
              ? fedModalLocationCopy
              : harvardModalLocationCopy;
          const descriptionWithLocationCopy = `${
            source.description
          }${' '}${locationCopyToUse}`;

          return (
            <Style.SourceContainer key={`source-${i}`}>
              <Style.SourceCopyContainer item xs={12} key="intro">
                <Style.SourceTitle id={`${source.linkLabel}`}>
                  {source.sourceName}
                </Style.SourceTitle>
                <Style.SourceIntro
                  source={descriptionWithLocationCopy}
                  linkTarget="_blank"
                />
              </Style.SourceCopyContainer>
              <Grid item xs={12} key="levels">
                <SourceTabs
                  levels={source.levels}
                  onSelectLevel={(level: SourceLevel) =>
                    onSelectLevel(level, source.trackLabel)
                  }
                  initialLevel={
                    i === 0
                      ? fedLevel
                        ? fedTabIndex[fedLevel]
                        : 0
                      : harvardLevel
                      ? harvardTabIndex[harvardLevel]
                      : 0
                  }
                />
              </Grid>
            </Style.SourceContainer>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default RecommendModalBody;
