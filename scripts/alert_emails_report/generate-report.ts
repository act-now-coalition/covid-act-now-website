import path from 'path';
import _ from 'lodash';
import moment from 'moment';
import CampaignMonitor, {
  CampaignMonitorStats,
} from '../alert_emails/campaign-monitor';
import {
  getFirestore,
  fetchAllAlertSubscriptions,
} from '../alert_emails/firestore';
import GoogleSheets, { Cell } from '../common/google-sheets';
import {
  getLocationNameForFips,
  findCountyByFips,
  isStateFips,
} from '../../src/common/locations';
import { ALERT_EMAIL_GROUP_PREFIX } from '../alert_emails/utils';

function getSpreadsheetId(): string {
  if (process.env.SPREADSHEET_ID) {
    return 'process.env.SPREADSHEET_ID';
  } else {
    return '1M-GXVtFrv5NK1_Gceu8ynkK3OsHjD3GEQY4vaG0lDaA';
  }
}

const keyFile = path.join(
  __dirname,
  '../alert_emails/google-service-account.json',
);

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

  try {
    await updateEngagementStats();
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

  await gsheets.clearAndAppend(
    spreadsheetId,
    'data-counties!A2:D',
    countyStats,
  );
  await gsheets.clearAndAppend(spreadsheetId, 'data-states!A2:B', stateStats);
}

function formatStateStats(stats: FipsCount[]): Cell[][] {
  const data = stats.map(({ fips, count }) => [
    getLocationNameForFips(fips),
    count,
  ]);
  return _.sortBy(data, item => item[0]);
}

function formatCountyStats(stats: FipsCount[]): Cell[][] {
  const data = stats.map(({ fips, count }) => {
    const county = findCountyByFips(fips);
    const fipsCode = `'${fips}`;
    const countyName: string = county?.county
      ? county?.county
      : 'Unknown county';
    const stateCode: string = county?.state_code ? county?.state_code : '-';
    return [fipsCode, countyName, stateCode, count];
  });
  return _.sortBy(data, item => item[0]);
}

async function updateEngagementStats() {
  const spreadsheetId = getSpreadsheetId();
  const dateTo = new Date();
  const dateFrom = moment().subtract(7, 'day').toDate();
  const gsheets = new GoogleSheets(keyFile);
  const rows = await fetchEngagementStats(dateFrom, dateTo);
  await gsheets.clearAndAppend(spreadsheetId, 'data-emails!A2:F', rows);
}

async function fetchEngagementStats(from: Date, to: Date): Promise<Cell[][]> {
  const cm = new CampaignMonitor(process.env.CREATE_SEND_TOKEN);
  const dateFrom = new Date('2020-07-23');
  const dateTo = new Date();
  const groups = await cm.fetchTransactionalGroups();

  const alertGroupNames = groups
    .filter(group => group.Group.startsWith(ALERT_EMAIL_GROUP_PREFIX))
    .map(group => group.Group)
    .sort();

  const stats = await Promise.all(
    alertGroupNames.map(async (groupName: string) => {
      const groupStats = await cm.fetchTransactionalStats(
        groupName,
        dateFrom,
        dateTo,
      );
      return formatGroupStats(groupName, groupStats);
    }),
  );

  return stats;
}

function formatGroupStats(groupName: string, stats: CampaignMonitorStats) {
  return [groupName, stats.Sent, stats.Opened, stats.Clicked, stats.Bounces];
}

if (require.main === module) {
  main();
}
