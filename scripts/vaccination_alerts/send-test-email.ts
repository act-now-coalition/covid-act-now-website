import _ from 'lodash';
import EmailService, {
  isInvalidEmailError,
} from '../alert_emails/email-service';
import { generateEmailData } from './utils';

async function main(email: string, fipsCode: string) {
  const emailService = new EmailService();
  const emailData = generateEmailData(email, fipsCode);

  try {
    await emailService.sendEmail(emailData);
    console.info(`Email sent to ${email}.`);
  } catch (err) {
    if (isInvalidEmailError(err)) {
      console.log(`Invalid email: "${email}"`);
    } else {
      console.error(`Error sending email to "${email}"`, err);
    }
    process.exit(-1);
  }

  return true;
}

function printUsage() {
  console.log('yarn vaccinations-send-test-email user@email.com fipsCode');
}

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    printUsage();
    process.exit(1);
  }
  return args;
}

if (require.main === module) {
  const [email, fipsCode] = parseArgs();
  main(email, fipsCode)
    .then(() => {
      console.info('Done');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error', err);
      process.exit(-1);
    });
}
