import path from 'path';
import _ from 'lodash';
import moment from 'moment';
import CampaignMonitor from '../alert_emails/campaign-monitor';
import {
  getFirestore,
  fetchAllAlertSubscriptions,
} from '../alert_emails/firestore';
import { ALERT_EMAIL_GROUP, toISO8601 } from '../alert_emails/utils';
import GoogleSheets, { Cell } from '../common/google-sheets';
import {
  getLocationNameForFips,
  findCountyByFips,
  isStateFips,
} from '../../src/common/locations';

const SPREADSHEET_ID = '1cs3Wyh8Gda0H18_-x5RYp7AJ3FwB-I1ewAQTBWEk1YY';
const REPORT_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`;

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

  console.info('Done.');
  console.info(`Check the report: ${REPORT_URL}`);
  process.exit(0);
}

async function updateSubscriptionsByLocation() {
  const db = getFirestore();
  const gsheets = new GoogleSheets(keyFile);

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

  const countyRange = 'subscriptions by county!A2:D';
  await gsheets.clearAndAppend(SPREADSHEET_ID, countyRange, countyStats);

  const stateRange = 'subscriptions by state!A2:B';
  await gsheets.clearAndAppend(SPREADSHEET_ID, stateRange, stateStats);
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
  const dateTo = new Date();
  const dateFrom = moment().subtract(7, 'day').toDate();
  const gsheets = new GoogleSheets(keyFile);
  const range = 'data_engagement!A2:F';
  const rows = await fetchEngagementStats(dateFrom, dateTo);
  await gsheets.appendRows(SPREADSHEET_ID, range, rows);
}

async function fetchEngagementStats(from: Date, to: Date): Promise<Cell[][]> {
  const cm = new CampaignMonitor(process.env.CREATE_SEND_TOKEN);
  const stats = await cm.fetchTransactionalStats(ALERT_EMAIL_GROUP, from, to);
  return [
    [
      toISO8601(from),
      toISO8601(to),
      stats.Sent,
      stats.Opened,
      stats.Clicked,
      stats.Bounces,
    ],
  ];
}

if (require.main === module) {
  main();
}
