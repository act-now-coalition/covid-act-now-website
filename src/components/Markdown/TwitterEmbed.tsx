import { Dictionary } from 'lodash';
import React from 'react';

/**
 * Copy the embed code from https://publish.twitter.com/
 */
const CaseStudyPublicHealthRx: React.FC = () => {
  return (
    <blockquote className="twitter-tweet">
      <p lang="en" dir="ltr">
        One of my favorite covid19 resources.{' '}
        <a href="https://twitter.com/CovidActNow?ref_src=twsrc%5Etfw">
          @CovidActNow
        </a>{' '}
        <br />
        Their putting out extremely useful content. Check them out.{' '}
        <a href="https://twitter.com/hashtag/healthcaremediacontributor?src=hash&amp;ref_src=twsrc%5Etfw">
          #healthcaremediacontributor
        </a>
        <a href="https://twitter.com/hashtag/healthcareinfluencer?src=hash&amp;ref_src=twsrc%5Etfw">
          #healthcareinfluencer
        </a>
        <a href="https://twitter.com/hashtag/thepublichealthpharmacist?src=hash&amp;ref_src=twsrc%5Etfw">
          #thepublichealthpharmacist
        </a>
        <a href="https://t.co/281Y7mC995">pic.twitter.com/281Y7mC995</a>
      </p>
      &mdash; ThePublicHealthPharmacist (@PublicHealthRx){' '}
      <a href="https://twitter.com/PublicHealthRx/status/1286762591520346113?ref_src=twsrc%5Etfw">
        July 24, 2020
      </a>
    </blockquote>
  );
};

const twitterEmbedsByUrl: Dictionary<React.FC> = {
  'https://twitter.com/PublicHealthRx/status/1286762591520346113': CaseStudyPublicHealthRx,
};

export function isTwitterEmbed(url: string) {
  return Object.keys(twitterEmbedsByUrl).includes(url);
}

const TweetEmbed: React.FC<{ statusUrl: string }> = ({ statusUrl }) => {
  const EmbedComponent = twitterEmbedsByUrl[statusUrl];
  return EmbedComponent ? <EmbedComponent /> : null;
};

export default TweetEmbed;
