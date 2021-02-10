import _ from 'lodash';
import EmailService, {
  isInvalidEmailError,
} from '../alert_emails/email-service';
import { generateEmailContent, generateEmailData } from './utils';
import { vaccinationAlert } from './vaccination-data-mock';
import regions from '../../src/common/regions';

async function main(emailAddress: string) {
  const emailService = new EmailService();

  const fipsCode = '08';
  const vaccineInfo = vaccinationAlert[fipsCode];

  const region = regions.findByFipsCodeStrict(fipsCode);

  const subjectLine = `Who is currently eligible for vaccination in ${region.fullName}`;
  const emailContentHtml = generateEmailContent(emailAddress, vaccineInfo);
  const emailData = generateEmailData(
    emailAddress,
    subjectLine,
    emailContentHtml,
  );

  try {
    await emailService.sendEmail(emailData);
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
  console.log('yarn vaccinations-send-test-email user@email.com');
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
