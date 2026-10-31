/**
 * Generates index.html pages for the home page and all state / county pages,
 * filling the meta tags for OpenGraph / Twitter with the appropriate title /
 * description / image information.
 *
 * You can run via `yarn generate-index-pages`
 */

import fs from 'fs-extra';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import urlJoin from 'url-join';
import regions, { Region } from '../src/common/regions';
import * as urls from '../src/common/urls';

// We don't care about the values here, but this is a cheap way to determine all
// of the counties we have any data for and are therefore share-able.
import { LocationSummariesByFIPS } from '../src/common/location_summaries';
import { ALL_METRICS, getMetricName } from '../src/common/metric';

function hasLocationSummary(region: Region) {
  return LocationSummariesByFIPS[region.fipsCode] !== undefined;
}

// We pre-generate the next 2000 IDs each time we do a deploy which should be
// sufficient unless we get more than 2000 shares/day.

type MetaTags = { [name: string]: string };

// Every page shares the site's default social card (also set in public/index.html).
const SOCIAL_IMAGE_URL = 'https://covidactnow.org/covidactnow.png';

function homePageTags(imageUrl: string): MetaTags {
  // Most of the tags are set correctly in public/index.html so we don't need to
  // replace them.
  return {
    'og:image:url': imageUrl,
    'twitter:image': imageUrl,
  };
}

function locationPageTags(
  fullImageUrl: string,
  canonicalUrl: string,
  locationName: string,
): MetaTags {
  const title = `U.S. COVID Risk & Vaccine Tracker`;
  const description = `Covid Act Now has real-time tracking of your community's COVID risk level. Explore how ${locationName} is doing.`;
  return {
    'og:url': canonicalUrl,
    'og:image:url': fullImageUrl,
    'og:title': title,
    'og:description': description,

    'twitter:image': fullImageUrl,
    'twitter:title': title,
    'twitter:description': description,
  };
}

function chartPageTags(
  fullImageUrl: string,
  canonicalUrl: string,
  locationName: string,
  metricName: string,
): MetaTags {
  const title = `${locationName}: ${metricName}`;
  const description = `Covid Act Now has real-time tracking of your community's COVID risk level. Explore how ${locationName} is doing.`;
  return {
    'og:url': canonicalUrl,
    'og:image:url': fullImageUrl,
    'og:title': title,
    'og:description': description,

    'twitter:image': fullImageUrl,
    'twitter:title': title,
    'twitter:description': description,
  };
}

async function buildLocationPages(
  builder: IndexPageBuilder,
  relativeSiteUrl: string,
  locationName: string,
) {
  const canonicalUrlBase = urlJoin('https://covidactnow.org/', relativeSiteUrl);

  const canonicalUrl = urls.addSharingId(canonicalUrlBase);
  const page = path.join(relativeSiteUrl, 'index.html');
  await builder.writeTemplatedPage(
    page,
    locationPageTags(SOCIAL_IMAGE_URL, canonicalUrl, locationName),
  );

  for (const metric of ALL_METRICS) {
    const chartPage = path.join(relativeSiteUrl, `/chart/${metric}/index.html`);
    const chartCanonicalUrl = urls.addSharingId(
      urlJoin(canonicalUrlBase, `/chart/${metric}`),
    );
    await builder.writeTemplatedPage(
      chartPage,
      chartPageTags(
        SOCIAL_IMAGE_URL,
        chartCanonicalUrl,
        locationName,
        getMetricName(metric),
      ),
    );
  }
}

async function main() {
  console.log('Building index.html pages...');

  const builder = await IndexPageBuilder.initialize();
  await builder.writeTemplatedPage(
    '/index.html',
    homePageTags(SOCIAL_IMAGE_URL),
  );

  for (const state of regions.states) {
    await buildLocationPages(builder, state.relativeUrl, state.fullName);
  }

  const counties = regions.counties.filter(hasLocationSummary);

  for (const county of counties) {
    await buildLocationPages(builder, county.relativeUrl, county.fullName);
  }

  const metros = regions.metroAreas.filter(hasLocationSummary);

  for (const metro of metros) {
    await buildLocationPages(builder, metro.relativeUrl, metro.fullName);
  }
}

class IndexPageBuilder {
  // TODO(michael): I know parsing HTML via regex is super fraught (could be
  // fragile) but I'm also hesitant to parse / emit modified HTML. This feels
  // safer, at least for now.
  private readonly META_TAG_REGEX = new RegExp(
    /<meta\s+(?<propKey>(?:property|name))="(?<name>[^"]*?)"\s+content="(?<value>[^"]*?)"/,
    'g',
  );

  constructor(
    private readonly buildDir: string,
    private readonly indexHtmlTemplate: string,
  ) {}

  static async initialize(): Promise<IndexPageBuilder> {
    const buildDir = path.join(__dirname, '../build');

    const indexHtmlTemplate = (
      await fs.readFile(path.join(buildDir, 'index.html'))
    ).toString();

    return new IndexPageBuilder(buildDir, indexHtmlTemplate);
  }

  async writeTemplatedPage(
    relHtmlUrl: string,
    tags: { [tag: string]: string },
  ): Promise<void> {
    const pageFile = path.join(this.buildDir, relHtmlUrl);
    const parentDir = path.resolve(pageFile, '..');
    await fs.ensureDir(parentDir);

    const html = this.templatedHtml(tags, relHtmlUrl);
    await fs.writeFile(pageFile, html);
  }

  private templatedHtml(
    tags: { [tag: string]: string },
    canonicalUrl: string,
  ): string {
    let html = this.replaceMetatags(tags);
    return this.replaceCanonicalUrl(canonicalUrl, html);
  }

  private replaceMetatags(tags: { [tag: string]: string }): string {
    const replaced: string[] = [];
    let html = this.indexHtmlTemplate.replace(
      this.META_TAG_REGEX,
      (original, propKey, name) => {
        const newValue = tags[name];
        if (newValue !== undefined) {
          replaced.push(name);
          return `<meta ${propKey}="${name}" content="${newValue}"`;
        } else {
          return original;
        }
      },
    );

    const notFoundTags = _.difference(Object.keys(tags), replaced);
    if (notFoundTags.length > 0) {
      console.error('Failed to replace meta tags: ', notFoundTags);
      process.exit(-1);
    }

    return html;
  }

  private replaceCanonicalUrl(relativeHtmlUrl: string, html: string) {
    const relativeUrl = relativeHtmlUrl.replace('index.html', '');
    return html.replace(
      `rel="canonical" href="https://covidactnow.org/"`,
      `rel="canonical" href="${urlJoin(
        'https://covidactnow.org/',
        relativeUrl,
      )}"`,
    );
  }
}

main()
  .then(() => {
    // HACK: We aggressively exit the process, else Firestore SDK will keep node from exiting for 60s
    // thanks to open network connections.
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(-1);
  });
