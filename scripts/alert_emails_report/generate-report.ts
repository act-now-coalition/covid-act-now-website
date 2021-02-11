import path from 'path';
import moment from 'moment';
import _ from 'lodash';
import {
  fetchAllAlertSubscriptions,
  Subscription,
} from '../alert_emails/firestore';
import { getFirestore } from '../common/firebase';
import GoogleSheets, { Cell } from '../common/google-sheets';
import {
  findCountyByFips,
  isStateFips,
  findStateByFips,
} from '../../src/common/locations';
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
const RANGE_SUBSCRIPTIONS = 'data-subscriptions!A2:B';

interface FipsCount {
  fips: string;
  count: number;
}

async function main() {
  const db = getFirestore();
  const subscriptions = await fetchAllAlertSubscriptions(db);
  await updateSubscriptionsByLocation(subscriptions);
  await updateSubscriptionsByDate(subscriptions);

  try {
    // TODO(michael): Get engagement stats from AWS.
    // await updateEngagementStats();
  } catch (err) {
    console.error('Error updating engagement stats', err);
  }

  const spreadsheetId = getSpreadsheetId();
  const reportUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;

  console.info('Done.');
  console.info(`Check the report: ${reportUrl}`);
  process.exit(0);
}

async function updateSubscriptionsByLocation(subscriptions: Subscription[]) {
  const gsheets = new GoogleSheets(keyFile);
  const spreadsheetId = getSpreadsheetId();

  const allFips = _.flatten(
    subscriptions.map(subscription => subscription.locations),
  );
  const groupedByFips = _.groupBy(allFips, fips => fips);
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

async function updateSubscriptionsByDate(subscriptions: Subscription[]) {
  const gsheets = new GoogleSheets(keyFile);
  const spreadsheetId = getSpreadsheetId();

  const sortedSubscriptions = _.chain(subscriptions)
    .filter(s => s.subscribedAt !== undefined)
    .sortBy(s => s.subscribedAt)
    .value();

  const dateTotals = [];

  // We may have a few subscriptions without subscribedAt dates. Include them from the start.
  let total = subscriptions.length - sortedSubscriptions.length;

  // Start at the beginning of the first day with subscriptions and work forwards.
  let curDate = moment(sortedSubscriptions[0].subscribedAt).startOf('day');

  for (const subscription of sortedSubscriptions) {
    const subscribedAt = moment(subscription.subscribedAt);
    const days = moment(subscribedAt).diff(curDate, 'days');
    if (days >= 1) {
      dateTotals.push([curDate.add(1, 'days').format('YYYY-MM-DD'), total]);
      curDate = subscribedAt.startOf('day');
    }
    total++;
  }
  // Include final day.
  curDate = curDate.add(1, 'day');
  dateTotals.push([curDate.format('YYYY-MM-DD'), total]);

  await gsheets.clearAndAppend(spreadsheetId, RANGE_SUBSCRIPTIONS, dateTotals);
}

function formatStateStats(stats: FipsCount[]): Cell[][] {
  const data = stats.map(({ fips, count }) => {
    const state = findStateByFips(fips);
    return [state?.state_code, state?.state, state?.population, count];
  });
  return _.sortBy(data, item => item[0]);
}

function formatCountyStats(stats: FipsCount[]): Cell[][] {
  const data = stats.map(({ fips, count }) => {
    const county = findCountyByFips(fips);
    // The ' prefix forces the value to be interpreted as text by Google Sheets
    const fipsCode = `'${fips}`;
    const countyName: string = county?.county || 'Unknown county';
    const stateCode: string = county?.state_code || '-';
    return [fipsCode, countyName, stateCode, county?.population, count];
  });
  return _.sortBy(data, item => item[0]);
}

/* TODO(michael): Get engagement stats from AWS.
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
*/

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(-1);
  });
}
