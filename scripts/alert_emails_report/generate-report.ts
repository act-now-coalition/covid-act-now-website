// TODO(michael): This script no longer works since we switched to AWS Simple Email Service. :~(

import path from 'path';
import _ from 'lodash';
import CampaignMonitor, {
  CampaignMonitorStats,
} from '../alert_emails/campaign-monitor';
import {
  getFirestore,
  fetchAllAlertSubscriptions,
} from '../alert_emails/firestore';
import GoogleSheets, { Cell } from '../common/google-sheets';
import { isStateFips } from '../../src/common/locations';
import regions, { County, State } from '../../src/common/regions';
import { ALERT_EMAIL_GROUP_PREFIX } from '../alert_emails/utils';

function getSpreadsheetId(): string {
  if (process.env.SPREADSHEET_ID) {
    return process.env.SPREADSHEET_ID;
  } else {
    return '1M-GXVtFrv5NK1_Gceu8ynkK3OsHjD3GEQY4vaG0lDaA';
  }
}

const keyFile = path.join(
  __dirname,
  '../common/google-sheets/google-service-account.json',
);

const RANGE_STATES = 'data-states!A2:D';
const RANGE_COUNTIES = 'data-counties!A2:E';
const RANGE_EMAILS = 'data-emails!A2:F';

interface FipsCount {
  fips: string;
  count: number;
}

async function main() {
  try {
    await updateSubscriptionsByLocation();
  } catch (err) {
    console.error('Error updating subscription stats', err);
  }

  await updateEngagementStats();
  try {
  } catch (err) {
    console.error('Error updating engagement stats', err);
  }

  const spreadsheetId = getSpreadsheetId();
  const reportUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;

  console.info('Done.');
  console.info(`Check the report: ${reportUrl}`);
  process.exit(0);
}

async function updateSubscriptionsByLocation() {
  const db = getFirestore();
  const gsheets = new GoogleSheets(keyFile);
  const spreadsheetId = getSpreadsheetId();

  const subscriptions = await fetchAllAlertSubscriptions(db);
  const groupedByFips = _.groupBy(subscriptions, fipsEmail => fipsEmail.fips);
  const countByFips = _.map(groupedByFips, (items, fips) => {
    return { fips, count: items.length };
  });

  const [stateCounts, countyCounts] = _.partition(countByFips, ({ fips }) =>
    isStateFips(fips),
  );
  const countyStats = formatCountyStats(countyCounts);
  const stateStats = formatStateStats(stateCounts);

  await gsheets.clearAndAppend(spreadsheetId, RANGE_COUNTIES, countyStats);
  await gsheets.clearAndAppend(spreadsheetId, RANGE_STATES, stateStats);
}

function formatStateStats(stats: FipsCount[]): Cell[][] {
  const data = stats.map(({ fips, count }) => {
    const state = regions.findByFipsCode(fips) as State;
    return [state?.stateCode, state?.name, state?.population, count];
  });
  return _.sortBy(data, item => item[0]);
}

function formatCountyStats(stats: FipsCount[]): Cell[][] {
  const data = stats.map(({ fips, count }) => {
    const region = (regions.findByFipsCode(fips) as County) || undefined;
    // The ' prefix forces the value to be interpreted as text by Google Sheets
    const fipsCode = `'${fips}`;
    const countyName: string = region?.name || 'Unknown County';
    const stateCode: string = region?.state.stateCode || '-';
    return [fipsCode, countyName, stateCode, region?.population, count];
  });
  return _.sortBy(data, item => item[0]);
}

async function updateEngagementStats() {
  const spreadsheetId = getSpreadsheetId();
  const gsheets = new GoogleSheets(keyFile);
  const rows = await fetchEngagementStats();
  await gsheets.clearAndAppend(spreadsheetId, RANGE_EMAILS, rows);
}

async function fetchEngagementStats(): Promise<Cell[][]> {
  const cm = new CampaignMonitor(process.env.CREATE_SEND_TOKEN);
  const groups = await cm.fetchTransactionalGroups();

  const alertGroupNames = groups
    .filter(group => group.Group.startsWith(ALERT_EMAIL_GROUP_PREFIX))
    .map(group => group.Group)
    .sort();

  const stats = await Promise.all(
    alertGroupNames.map(async (groupName: string) => {
      const groupStats = await cm.fetchTransactionalStats(groupName);
      return formatGroupStats(groupName, groupStats);
    }),
  );

  return stats;
}

function formatGroupStats(groupName: string, stats: CampaignMonitorStats) {
  return [groupName, stats.Sent, stats.Opened, stats.Clicked, stats.Bounces];
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
