import CampaignMonitor from './campaign-monitor';
import { Alert } from './interfaces';
import { generateAlertEmailData } from './utils';

const locationAlert: Alert = {
  fips: '11',
  locationName: 'District of Columbia',
  locationURL: 'https://covidactnow.org/us/dc/',
  lastUpdated: '06/26/2020',
  oldLevel: 2,
  newLevel: 3,
};

async function main(emailAddress: string) {
  const cm = new CampaignMonitor(process.env.CREATE_SEND_TOKEN);
  const data = generateAlertEmailData(emailAddress, locationAlert);
  try {
    await cm.sendClassicEmail(data);
    console.info(`Email sent to ${emailAddress}.`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

function printUsage() {
  console.log('yarn send-test-email user@email.com');
}
function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    printUsage();
    process.exit(1);
  }
  return args[0];
}

if (require.main === module) {
  const emailAddress = parseArgs();
  main(emailAddress);
}
