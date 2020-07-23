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
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

if (require.main === module) {
  main('pnavarrc@gmail.com');
}
