/**
 * Send an alert email to a single email address, using the locationAlert
 * data hardcoded below. Make sure that the AWS_ACCESS_KEY_ID and
 * AWS_SECRET_ACCESS_KEY environment variables are set before sending the email.
 *
 * Example:
 *
 *    $ yarn send-test-email pablo@covidactnow.org
 */

import EmailService, { isInvalidEmailError } from './email-service';
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
  const emailService = new EmailService();
  const data = generateAlertEmailData(emailAddress, locationAlert);
  try {
    await emailService.sendEmail(data);
    console.info(`Email sent to ${emailAddress}.`);
  } catch (err) {
    if (isInvalidEmailError(err)) {
      console.log(`Invalid email: "${emailAddress}"`);
    } else {
      console.error(`Error sending email to "${emailAddress}"`, err);
    }
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
