import React, { useEffect } from 'react';

/**
 * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-oembed
 */
const TweetEmbedA: React.FC<{ href: string }> = ({ href }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

const TweetEmbed: React.FC<{ href: string }> = ({ href }) => {
  useEffect(() => {
    const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(
      href,
    )}`;
    console.log(oembedUrl);
    fetch(oembedUrl).then(res => {
      console.log(res.json());
    });
  });
  return <React.Fragment>EMBED</React.Fragment>;
};

export default TweetEmbed;
