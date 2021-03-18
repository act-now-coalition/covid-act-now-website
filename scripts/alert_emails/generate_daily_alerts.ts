/**
 * Generates the daily alerts file based on the provided snapshot. The "base"
 * snapshot to compare against will be retrieved from Firestore.
 *
 * Run via: yarn generate-daily-alerts <new_snapshot>
 *
 * Generates a file alerts.json containing a map of { <fips>: Alert } (see
 * Alert in interfaces.ts)
 */

import fs from 'fs-extra';
import path from 'path';
import { fetchMainSnapshotNumber } from '../../src/common/utils/snapshots';
import regions from '../../src/common/regions';
import { Alert } from './interfaces';
import { getFirestore } from '../common/firebase';
import { SummariesMap } from '../../src/common/location_summaries';
import { Level } from '../../src/common/level';
import { resolveSnapshot } from './utils';
import {
  dateToUTC,
  TimeUnit,
  subtractTime,
  TimeFormat,
  formatDateTime,
} from '../../src/common/utils/time-utils';

const summariesFolder = path.join(__dirname, 'summaries');
const outputFile = path.join(__dirname, 'alerts.json');

async function main() {
  const { newSnap } = await parseArgs();
  const oldSnap = await getLastSnapshotNumber();

  const oldSummaries: SummariesMap = await fs.readJSON(
    path.join(summariesFolder, `${oldSnap}.json`),
  );
  const newSummaries: SummariesMap = await fs.readJSON(
    path.join(summariesFolder, `${newSnap}.json`),
  );

  const alerts: { [fips: string]: Alert } = {};
  for (const fips in newSummaries) {
    const region = regions.findByFipsCodeStrict(fips);
    const newSummary = newSummaries[fips];
    const oldSummary = oldSummaries[fips];
    const oldLevel = oldSummary ? oldSummary.level : Level.UNKNOWN;
    const newLevel = newSummary.level;
    const locationName = region.fullName;
    const locationURL = region.canonicalUrl;
    // Use today's date (roughly in the Pacific timezone).
    const lastUpdated = formatDateTime(
      subtractTime(dateToUTC(new Date()), 8, TimeUnit.HOURS),
      TimeFormat.MM_DD_YYYY,
    );
    if (oldLevel !== newLevel && newLevel !== Level.UNKNOWN) {
      alerts[fips] = {
        fips,
        locationName,
        locationURL,
        lastUpdated,
        oldLevel,
        newLevel,
      };
    }
  }

  await fs.writeFile(outputFile, JSON.stringify(alerts));

  console.log(`Done. Generated ${outputFile}`);
}

async function parseArgs(): Promise<{ newSnap: number }> {
  const args = process.argv.slice(2);
  if (args.length === 1) {
    const newSnap = await resolveSnapshot(args[0]);
    return { newSnap };
  } else {
    exitWithUsage();
  }
}

function exitWithUsage(): never {
  console.log('Usage: yarn generate-daily-alerts <new_snapshot>');
  process.exit(-1);
}

async function getLastSnapshotNumber(): Promise<number> {
  let alertsInfo = await getFirestore().doc('info/alerts').get();
  let lastSnapshot = alertsInfo.get('lastSnapshot');
  if (lastSnapshot) {
    console.info(`Last alerts snapshot: ${lastSnapshot}`);
  } else {
    lastSnapshot = await fetchMainSnapshotNumber();
    console.info(`No last alerts snapshot found. Using ${lastSnapshot}`);
  }
  return lastSnapshot;
}

main().catch(e => {
  console.error(e);
  process.exit(-1);
});
