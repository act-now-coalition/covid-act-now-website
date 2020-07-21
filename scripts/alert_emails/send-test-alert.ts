import CreateSend from './createsend';
import { Alert } from './interfaces';
import {
  getEmailContent,
  getSubjectLine,
  generateAlertEmailData,
} from './utils';

const locationAlert: Alert = {
  fips: '11',
  locationName: 'District of Columbia',
  locationURL: 'https://covidactnow.org/us/dc/',
  lastUpdated: '06/26/2020',
  oldLevel: 2,
  newLevel: 3,
};

const getEmailData = (emailAddress: string, locationAlert: Alert) => {
  const subjectLine = getSubjectLine(locationAlert);
  const emailContent = getEmailContent(emailAddress, locationAlert);
  return generateAlertEmailData(emailAddress, subjectLine, emailContent);
};

async function main(emailAddress: string) {
  const emailData = getEmailData(emailAddress, locationAlert);
  const createSend = new CreateSend(process.env.CREATE_SEND_TOKEN);
  try {
    await createSend.sendClassicEmail(emailData);
    console.info(`Email sent to ${emailAddress}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

const printUsage = () => {
  console.log('send-test-alert <email>');
};

const parseArgs = () => {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    printUsage();
    process.exit(1);
  }
  return args[0];
};

if (require.main === module) {
  const emailAddress = parseArgs();
  main(emailAddress);
}
