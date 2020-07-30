import path from 'path';
import _ from 'lodash';
import moment from 'moment';
import CampaignMonitor from '../alert_emails/campaign-monitor';
import { getFirestore } from '../alert_emails/firestore';
import { ALERT_EMAIL_GROUP, toISO8601 } from '../alert_emails/utils';
import fipsByStateCode from '../what-the-fips/2018-census-fips-codes.json';
import { findStateByFips, getAllStateFips } from '../../src/common/locations';
import GoogleSheets from '../common/google-sheets';

const REPORT_SPREADSHEET_ID = '1cs3Wyh8Gda0H18_-x5RYp7AJ3FwB-I1ewAQTBWEk1YY';

interface StateFipsMap {
  [stateCode: string]: {
    [countyFips: string]: string;
  };
}

const keyFile = path.join(
  __dirname,
  '../alert_emails/google-service-account.json',
);

async function generateAlertEmailReport() {
  const db = getFirestore();
  const gsheets = new GoogleSheets(keyFile);
  await gsheets.authenticate();

  // TODO: Confirm, what is the best way to measure engagement stats?
  const dateFrom = new Date('2020-07-24'); // initial send
  const dateTo = moment(dateFrom).add(8, 'day').toDate();
  const engagementStats = await fetchEngagementStats(dateFrom, dateTo);
  await gsheets.appendRows(REPORT_SPREADSHEET_ID, 'data_engagement!A2:IE', [
    [engagementStats],
  ]);

  const fipsStates = getAllStateFips();
  const subscriptionStats = await Promise.all(
    fipsStates.map(stateFips => fetchStateSubscriptionStats(db, stateFips)),
  );
  await gsheets.appendRows(REPORT_SPREADSHEET_ID, 'data_locations!A2:F2', [
    subscriptionStats,
  ]);
}

async function fetchEngagementStats(from: Date, to: Date) {
  const cm = new CampaignMonitor(process.env.CREATE_SEND_TOKEN);
  const { Sent, Opened, Clicked, Bounces } = await cm.fetchTransactionalStats(
    ALERT_EMAIL_GROUP,
    from,
    to,
  );
  return [toISO8601(to), Sent, Opened, Clicked, Bounces];
}

async function fetchStateSubscriptionStats(
  db: FirebaseFirestore.Firestore,
  fips: string,
): Promise<any[]> {
  const emailCountState = await fetchSubscriptionCountByFips(db, fips);
  const { state_code: code, state: name, population } = findStateByFips(fips);

  // TODO(pablo): Is there a way to assign the type to the import directly?
  const countyFipsByStateCode: StateFipsMap = fipsByStateCode;
  const fipsCounties = Object.keys(countyFipsByStateCode[code]);
  const emailsByCounty = await Promise.all(
    fipsCounties.map(fipsCounty =>
      fetchSubscriptionCountByFips(db, fipsCounty),
    ),
  );

  const emailCountCounties = _.sum(emailsByCounty);
  return [
    toISO8601(new Date()),
    name,
    population,
    emailCountState,
    emailCountCounties,
    emailCountState + emailCountCounties,
  ];
}

async function fetchSubscriptionCountByFips(
  db: FirebaseFirestore.Firestore,
  fips: string,
) {
  const querySnapshot = await db
    .collection('alerts-subscriptions')
    .where('locations', 'array-contains', fips)
    .get();
  return querySnapshot.size;
}

if (require.main === module) {
  generateAlertEmailReport();
}
