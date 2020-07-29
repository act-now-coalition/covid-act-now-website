import _ from 'lodash';
import moment from 'moment';
import CampaignMonitor from './campaign-monitor';
import { getFirestore } from './firestore';
import { ALERT_EMAIL_GROUP, toISO8601 } from './utils';
import fipsByStateCode from '../what-the-fips/2018-census-fips-codes.json';
import STATES from '../../src/common/us_states';
import { findStateFipsCode, findStateByFips } from '../../src/common/locations';

interface StateFipsMap {
  [stateCode: string]: {
    [countyFips: string]: string;
  };
}

interface StateEmailStats {
  fips: string;
  code: string;
  name: string;
  population: number;
  emailCountState: number;
  emailCountCounties: number;
}

function getStatesFips() {
  return Object.keys(STATES).map(stateCode => {
    return findStateFipsCode(stateCode);
  });
}

async function generateAlertEmailReport() {
  // TODO: Confirm, what is the best way to measure engagement stats?
  const dateFrom = moment().subtract(1, 'week').toDate();
  const dateTo = new Date();
  const engagementStats = await fetchEngagementStats(dateFrom, dateTo);

  const db = getFirestore();
  const fipsStates = getStatesFips();
  const subscriptionStats = await Promise.all(
    fipsStates.map(stateFips => fetchStateSubscriptionStats(db, stateFips)),
  );
  // TODO(pablo): Upload the stats somewhere accessible
  console.log(engagementStats);
  console.log(subscriptionStats);
}

async function fetchEngagementStats(from: Date, to: Date) {
  const cm = new CampaignMonitor(process.env.CREATE_SEND_TOKEN);
  const stats = await cm.fetchTransactionalStats(ALERT_EMAIL_GROUP, from, to);
  return {
    from: toISO8601(from),
    to: toISO8601(to),
    sent: stats.Sent,
    bounces: stats.Bounces,
    opened: stats.Opened,
    clicked: stats.Clicked,
  };
}

async function fetchStateSubscriptionStats(
  db: FirebaseFirestore.Firestore,
  fips: string,
): Promise<StateEmailStats> {
  const emailCountState = await fetchSubscriptionCountByFips(db, fips);
  const { state_code: code, state: name, population } = findStateByFips(fips);

  // TODO(pablo): Is there a way to assign the type to the import directly?
  const countyFipsByStateCode: StateFipsMap = fipsByStateCode;
  const fipsCounties = _.keys(countyFipsByStateCode[code]);
  const emailsByCounty = await Promise.all(
    fipsCounties.map(async fipsCounty =>
      fetchSubscriptionCountByFips(db, fipsCounty),
    ),
  );

  return {
    fips,
    code,
    name,
    population,
    emailCountState,
    emailCountCounties: _.sum(emailsByCounty),
  };
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
