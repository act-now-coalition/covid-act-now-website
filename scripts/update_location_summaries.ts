// You can run via `yarn update-location-summaries`
import fs from 'fs-extra';
import path from 'path';
import {
  fetchAllStateProjections,
  fetchAllCountyProjections,
} from '../src/common/utils/model';
import { currentSnapshot } from '../src/common/utils/snapshots';
import { LocationSummary } from '../src/common/location_summaries';

async function main() {
  const allStatesProjections = await fetchAllStateProjections();
  const allCountiesProjections = await fetchAllCountyProjections();

  const summaries = {} as { [fips: string]: LocationSummary };

  for (const stateProjections of allStatesProjections) {
    summaries[stateProjections.fips] = stateProjections.summary;
  }

  for (const countyProjections of allCountiesProjections) {
    summaries[countyProjections.fips] = countyProjections.summary;
  }

  const outputFolder = path.join(__dirname, '..', 'src', 'assets', 'data');
  await fs.writeJson(`${outputFolder}/summaries.json`, summaries);

  // We also store the historical summaries for email alerts purposes.
  const snapshotSummaryFile = path.join(
    __dirname,
    'alert_emails',
    'summaries',
    `${currentSnapshot()}.json`,
  );
  await fs.writeJSON(snapshotSummaryFile, summaries);

  console.log('done');
}

main().catch(e => {
  console.error(e);
  process.exit(-1);
});
