import CampaignMonitor, { CampaignMonitorStats } from './campaign-monitor';
import { ALERT_EMAIL_GROUP, toISO8601 } from './utils';

function formatEngagementData(
  from: Date,
  to: Date,
  stats: CampaignMonitorStats,
) {
  return {
    from: toISO8601(from),
    to: toISO8601(to),
    sent: stats.Sent,
    bounces: stats.Bounces,
    opened: stats.Opened,
    clicked: stats.Clicked,
  };
}

async function generateEngagementReport(from: Date, to: Date) {
  const cm = new CampaignMonitor(process.env.CREATE_SEND_TOKEN);
  const stats = await cm.fetchTransactionalStats(ALERT_EMAIL_GROUP, from, to);
  console.log(formatEngagementData(from, to, stats));
}

/**
 * Subscriptions by State
 * ----------------------
 *  date | state code | state name | subscriptionStates | subscriptionCounties | total
 * - evolution of subscriptions by state
 * - total subscriptions by state
 * - no county, too many rows
 */

/**
 * - read the most recent snapshot
 */
async function main(snapshotId: string) {
  await generateEngagementReport(
    new Date('2020-07-23'),
    new Date('2020-07-24'),
  );
}

if (require.main === module) {
  main('497');
}
