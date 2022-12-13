/**
 * Script to go through all the historical sent emails and generate aggregated
 * stats about emails sent. Stats are incrementally stored to a local file (to
 * support resuming progress in case an error is reported) and then stored to
 * Firestore at the end.
 */

import { getFirestore } from '../../common/firebase';
import FirebaseFirestore from '@google-cloud/firestore';
import path from 'path';
import * as fs from 'fs';

// File to store stats to. This is also used to support resuming in case there's an error.
const STATS_FILE = path.join(__dirname, 'stats.json');

// Number of documents to read at once.
const BATCH_SIZE = 50000;

interface SnapshotStats {
  totalEmailsSent: number;
}

interface Stats {
  totalEmailsSent: number;
  resumePoint?: string;
  alerts: {
    [snapshot: string]: SnapshotStats;
  };
  vaccinationAlerts: {
    [snapshot: string]: SnapshotStats;
  };
}

async function main() {
  const stats = readStatsFile();
  const db = getFirestore();

  let moreBatches = true;
  while (moreBatches) {
    moreBatches = await fetchNextBatch(db, stats);
    console.log(
      `Counted ${stats.totalEmailsSent} sent emails. Resume point: ${stats.resumePoint}`,
    );
    // Write stats file so far so we can resume if we encounter an error.
    writeStatsFile(stats);
  }

  writeStatsToFirestore(db, stats);

  console.info(`Done. Stats written to Firestore and to ${STATS_FILE}`);
}

async function fetchNextBatch(
  db: FirebaseFirestore.Firestore,
  stats: Stats,
): Promise<boolean> {
  let query = db
    .collectionGroup('emails')
    .orderBy(FirebaseFirestore.FieldPath.documentId());
  if (stats.resumePoint) {
    query = query.startAfter(stats.resumePoint);
  }
  query = query.limit(BATCH_SIZE);

  const querySnapshot = await query.get();
  let foundDocs = false;
  for (const doc of querySnapshot.docs) {
    stats.resumePoint = doc.ref.path;
    foundDocs = true;
    if (doc.get('sentAt') === null) {
      // skip any entries that were never sent.
      continue;
    }

    // Update snapshot stats.
    // Extract snapshot from path: snapshots/{snapshot}/locations/{location}/emails/{email}.
    const snapshotDoc = doc.ref.parent.parent?.parent.parent!;
    const snapshotId = snapshotDoc.id;
    // Get correct stats to update based on whether this was a vaccination alert or normal alert.
    const snapshotStats =
      snapshotDoc.parent.id === 'vaccination-alerts'
        ? stats.vaccinationAlerts
        : stats.alerts;
    snapshotStats[snapshotId] = snapshotStats[snapshotId] ?? {
      totalEmailsSent: 0,
    };
    snapshotStats[snapshotId].totalEmailsSent++;

    // Update global stats.
    stats.totalEmailsSent = stats.totalEmailsSent ?? 0;
    stats.totalEmailsSent++;
  }

  return foundDocs;
}

function readStatsFile(): Stats {
  if (fs.existsSync(STATS_FILE)) {
    return JSON.parse(fs.readFileSync(STATS_FILE).toString());
  } else {
    return { totalEmailsSent: 0, alerts: {}, vaccinationAlerts: {} };
  }
}

function writeStatsFile(stats: Stats) {
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats));
}

async function writeStatsToFirestore(
  db: FirebaseFirestore.Firestore,
  stats: Stats,
) {
  // Write vaccination alert email stats.
  for (const snapshot in stats.vaccinationAlerts) {
    db.doc(`vaccination-alert-stats/${snapshot}`).set(
      stats.vaccinationAlerts[snapshot],
    );
  }

  // Write alert email stats.
  for (const snapshot in stats.alerts) {
    db.doc(`alert-stats/${snapshot}`).set(stats.alerts[snapshot]);
  }

  // Write global stats.
  db.doc('info/alert-stats').set({
    totalEmailsSent: stats.totalEmailsSent,
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
