/**
 * Generates the daily alert file. Given two snapshots, finds differences in the
 * overall threat level and each metric and generates a summary file.
 *
 * Run via: yarn generate-daily-alerts [old_snapshot new_snapshot]
 *
 * If no snapshots provided, uses the master snapshot and the current branch's
 * snapshot.
 *
 * Generates a file alerts/<old_snapshot>-<new_snapshot>.json containing an
 * array of alerts. See the Alert interface below for schema.
 */

import fs from 'fs-extra';
import path from 'path';
import {
  fetchAllStateProjections,
  fetchAllCountyProjections,
} from '../../src/common/utils/model';
import { ProjectionsSet } from '../../src/common/models/ProjectionsSet';
import { Projections } from '../../src/common/models/Projections';
import { fetchMasterSnapshotNumber, snapshotFromUrl, snapshotUrl } from '../../src/common/utils/model';
import { SNAPSHOT_URL } from '../../src/api';
import { Level } from '../../src/common/level';
import { Metric, ALL_METRICS } from '../../src/common/metric';

const outputFolder = path.join(__dirname, 'alerts');

interface Alert {
  fips: string;
  oldLevel: Level;
  newLevel: Level;
  changedMetrics: Array<{
    metric: Metric,
    oldLevel: Level,
    newLevel: Level
  }>;
}

async function main() {
  const {oldSnap, newSnap} = await parseArgs();

  console.log('Fetching projections from snapshots...');
  const projectionsSet = ProjectionsSet.fromProjections(
    await fetchAllProjections(snapshotUrl(oldSnap)),
    await fetchAllProjections(snapshotUrl(newSnap))
  );

  const alerts: Alert[] = [ ];
  for(const pair of projectionsSet.pairs) {
    const oldLevel = pair.left.getAlarmLevel();
    const newLevel = pair.left.getAlarmLevel();
    const changedMetrics = [];
    for(const metric of ALL_METRICS) {
      if (metric !== Metric.FUTURE_PROJECTIONS) {
        const oldLevel = pair.left.getMetricLevel(metric);
        const newLevel = pair.right.getMetricLevel(metric);
        if (oldLevel !== newLevel) {
          changedMetrics.push({ metric, oldLevel, newLevel });
        }
      }
    }
    if (oldLevel !== newLevel || changedMetrics.length > 0) {
      alerts.push({
        fips: pair.fips,
        oldLevel,
        newLevel,
        changedMetrics
      });
    }
  }

  await fs.ensureDir(outputFolder);
  const file = path.join(outputFolder, `${oldSnap}-${newSnap}.json`);
  await fs.writeFile(file, JSON.stringify(alerts));

  console.log(`Done. Generated ${file}`);
}

async function parseArgs(): Promise<{oldSnap: number, newSnap: number}> {
  const args = process.argv.slice(2);
  if (args.length === 2) {
    const oldSnap = parseInt(args[0]);
    const newSnap = parseInt(args[1]);
    if (Number.isNaN(oldSnap) || Number.isNaN(newSnap)) {
      exitWithUsage();
    }
    return {oldSnap, newSnap};
  } else if (args.length === 0) {
    // no args
    const oldSnap = snapshotFromUrl(SNAPSHOT_URL);
    const newSnap = await fetchMasterSnapshotNumber();
    return { oldSnap, newSnap };
  } else {
    exitWithUsage();
  }
}

function exitWithUsage(): never {
  console.log('Usage: yarn generate-daily-alerts [oldSnap newSnap]');
  process.exit(-1);
}

async function fetchAllProjections(snapshotUrl: string): Promise<Projections[]> {
  const county = await fetchAllCountyProjections(snapshotUrl);
  const state = await fetchAllStateProjections(snapshotUrl);
  return county.concat(state);
}

main().catch(e => {
  console.error(e);
  process.exit(-1);
});
