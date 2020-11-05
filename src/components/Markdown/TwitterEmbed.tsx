import React from 'react';
// @ts-ignore
import { TwitterTweetEmbed } from 'react-twitter-embed';

const CaseStudyPublicHealthRx: React.FC = () => (
  <TwitterTweetEmbed tweetId={'1286762591520346113'} />
);

const twitterEmbedsByUrl: { [url: string]: React.FC } = {
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
