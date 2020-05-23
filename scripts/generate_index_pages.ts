/**
 * Generates index.html pages for the home page and all state / county pages,
 * filling the meta tags for OpenGraph / Twitter with the appropriate title /
 * description / image information.
 *
 * You can run via `yarn generate-index-pages`
 */

import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';
import urlJoin from 'url-join';
import US_STATE_DATASET from '../src/components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import ShareImageUrlJSON from '../src/assets/data/share_images_url.json';
import { STATES } from '../src/common';
import { assert } from '../src/common/utils';
import moment from 'moment';

// We don't care about the values here, but this is a cheap way to determine all
// of the counties we have any data for and are therefore share-able.
import CalculatedCountyInterventionJSON from '../src/assets/data/calculated_county_interventions.json';
const COUNTIES = Object.keys(CalculatedCountyInterventionJSON);

const BLACKLISTED_COUNTIES = [
  '11001', // Washington, DC - We treat it as a state, not a county.
];

type MetaTags = { [name: string]: string };

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
  const title = `Is ${locationName} ready to reopen?`;
  const description = 'Metrics and modeling to help America reopen safely.';
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

async function main() {
  console.log('Building index.html pages...');

  const builder = await IndexPageBuilder.initialize();

  await builder.writeTemplatedPage(
    '/index.html',
    homePageTags(builder.fullImageUrl('home.png')),
  );

  const formattedDateParam = moment().format("[?date=]YYYY-MM-D");

  for (const stateCode in STATES) {
    const stateName = (STATES as any)[stateCode];
    const relativeUrl = `/us/${stateCode.toLowerCase()}/`;
    // temporary, for testing:
        const canonicalUrl = urlJoin('https://covid-projections-git-casulin-url-param-sharing.covidactnow.now.sh/', relativeUrl, formattedDateParam);
    // const canonicalUrl = urlJoin('https://covidactnow.org/', relativeUrl, formattedDateParam);
    const imageUrl = builder.fullImageUrl(
      `states/${stateCode.toLowerCase()}.png`,
    );
    const page = path.join(relativeUrl, 'index.html');
    await builder.writeTemplatedPage(
      page,
      locationPageTags(imageUrl, canonicalUrl, stateName),
    );
  }

  for (const fips of COUNTIES) {
    if (BLACKLISTED_COUNTIES.includes(fips)) {
      continue;
    }
    const county = findCountyByFips(fips);
    assert(county, 'Failed to find county ' + fips);
    const stateCode = county.state_code;
    const locationName = `${county.county}, ${(STATES as any)[stateCode]}`;
    const relativeUrl = `/us/${stateCode.toLowerCase()}/county/${
      county.county_url_name
    }`;
    // temporary, for testing:
    const canonicalUrl = urlJoin('https://covid-projections-git-casulin-url-param-sharing.covidactnow.now.sh/', relativeUrl, formattedDateParam);
    // const canonicalUrl = urlJoin('https://covidactnow.org/', relativeUrl, formattedDateParam);
    const imageUrl = builder.fullImageUrl(`counties/${fips}.png`);
    const page = path.join(relativeUrl, 'index.html');
    await builder.writeTemplatedPage(
      page,
      locationPageTags(imageUrl, canonicalUrl, locationName),
    );
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
    private readonly imagesBaseUrl: string,
    private readonly indexHtmlTemplate: string,
  ) {}

  static async initialize(): Promise<IndexPageBuilder> {
    const imagesBaseUrl = ShareImageUrlJSON.share_image_url;

    const buildDir = path.join(__dirname, '../build');

    const indexHtmlTemplate = (
      await fs.readFile(path.join(buildDir, 'index.html'))
    ).toString();

    return new IndexPageBuilder(buildDir, imagesBaseUrl, indexHtmlTemplate);
  }

  async writeTemplatedPage(
    relHtmlUrl: string,
    tags: { [tag: string]: string },
  ): Promise<void> {
    const pageFile = path.join(this.buildDir, relHtmlUrl);
    const parentDir = path.resolve(pageFile, '..');
    await fs.ensureDir(parentDir);

    const html = this.templatedHtml(tags);
    await fs.writeFile(pageFile, html);
  }

  fullImageUrl(relImageUrl: string): string {
    return urlJoin(this.imagesBaseUrl, relImageUrl);
  }

  private templatedHtml(tags: { [tag: string]: string }): string {
    const replaced: string[] = [];
    const html = this.indexHtmlTemplate.replace(
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
}

// TODO(michael): Consolidate state / county lookups.
let fipsLookup: any = undefined!;

function findCountyByFips(fips: string) {
  if (!fipsLookup) {
    fipsLookup = {};
    const statesData = US_STATE_DATASET.state_county_map_dataset as any;
    for (const state in statesData) {
      const countiesData = statesData[state].county_dataset;
      for (const county of countiesData) {
        // TODO(michael): Just remove these combined counties from the dataset?
        if (county.county.includes('/')) {
          continue;
        }
        fipsLookup[county.full_fips_code] = county;
      }
    }
  }

  // NYC HACK.
  if (['36047', '36061', '36005', '36081', '36085'].includes(fips)) {
    fips = '36061';
  }

  return fipsLookup[fips];
}

main();
