import _ from 'lodash';
import * as yargs from 'yargs';
import EmailService, {
  EmailSendData,
  isInvalidEmailError,
} from '../alert_emails/email-service';
import {
  DEFAULT_ALERTS_FILE_PATH,
  readVaccinationAlerts,
  generateEmailData,
} from './utils';
import { RegionVaccinePhaseInfo } from '../../src/cms-content/vaccines/phases';
import FirestoreSubscriptions from './firestore-subscriptions';

const BATCH_SIZE = 20;

class SendVaccinationAlertsService {
  private readonly firestoreSubscriptions: FirestoreSubscriptions;
  private readonly emailService: EmailService;

  invalidEmailCount: number = 0;
  errorCount: number = 0;
  emailSent: number = 0;

  uniqueEmailAddress: { [email: string]: number } = {};

  constructor() {
    this.firestoreSubscriptions = new FirestoreSubscriptions();
    this.emailService = new EmailService();
  }

  private async onEmailSent(email: string, alert: RegionVaccinePhaseInfo) {
    this.updateSentEmailCounters(email);
    this.firestoreSubscriptions.markEmailAsSent(
      alert.fips,
      alert.emailAlertVersion,
      email,
    );
  }

  private async onInvalidEmail(email: string) {
    this.invalidEmailCount += 1;
    this.firestoreSubscriptions.removeInvalidEmailFromAlerts(email);
  }

  private updateSentEmailCounters(email: string) {
    this.emailSent += 1;
    this.uniqueEmailAddress[email] = (this.uniqueEmailAddress[email] || 0) + 1;
  }

  async fetchEmailsForAlert(alert: RegionVaccinePhaseInfo) {
    return this.firestoreSubscriptions.getEmailsToBeSentForVersion(
      alert.fips,
      alert.emailAlertVersion,
    );
  }

  public logEmailsToBeSentStats() {
    const uniqueEmails = _.keys(this.uniqueEmailAddress);
    console.info(`Total emails to be sent: ${this.emailSent}.`);
    console.info(`Unique Email addresses: ${uniqueEmails.length}.`);
    console.info(`Invalid emails removed: ${this.invalidEmailCount}.`);
  }

  public logErrors() {
    const { emailSent, invalidEmailCount, errorCount } = this;
    console.log(`Emails sent: ${emailSent}`);
    console.log(`Invalid emails removed: ${invalidEmailCount}`);
    console.log(`Error count: ${errorCount}`);
  }

  async updateVaccinationInfoVersion(alert: RegionVaccinePhaseInfo) {
    return this.firestoreSubscriptions.updateVaccinationInfoVersion(
      alert.fips,
      alert.emailAlertVersion,
    );
  }

  async sendAlertEmail(
    email: string,
    alert: RegionVaccinePhaseInfo,
    dryRun: boolean = false,
  ): Promise<void> {
    if (dryRun) {
      this.updateSentEmailCounters(email);
      return;
    }

    let sendData: EmailSendData = generateEmailData(email, alert.fips);

    try {
      await this.emailService.sendEmail(sendData);
      await this.onEmailSent(email, alert);
    } catch (err) {
      if (isInvalidEmailError(err)) {
        await this.onInvalidEmail(email);
      } else {
        const { fips, emailAlertVersion } = alert;
        console.error(
          `Error sending email to ${email}, FIPS: ${fips}, version: ${emailAlertVersion}.`,
          err,
        );
        this.errorCount += 1;
      }
    }
  }
}

/**
 * Send vaccination alerts to subscribers. Fetch the list of users to email from
 * Firestore and send the emails in batches. It takes optional parameters:
 *
 * - `dryRun`: if true, it doesn't send the emails, just logs the number of
 *   emails to be sent.
 * - `emailAddress`: if given, it only send the email to that address, instead of
 *   sending the emails to the subscribers in Firestore.
 *
 * yarn vaccinations-send-alert-emails [dryRun] [emailAddress]
 *
 */
async function main(alertPath: string, dryRun: boolean, singleEmail?: string) {
  const alertsByFips = readVaccinationAlerts(alertPath);
  const alerts = _.values(alertsByFips);

  const alertEmailService = new SendVaccinationAlertsService();

  const emailAlertTuples = _.flatten(
    await Promise.all(
      alerts.map(async alert => {
        const emails = await alertEmailService.fetchEmailsForAlert(alert);
        return (
          emails
            // if an email is specified, filter out all other emails. Used for testing
            .filter(email => (singleEmail ? email === singleEmail : true))
            .map(email => ({ email, alert }))
        );
      }),
    ),
  );

  const emailBatches = _.chunk(emailAlertTuples, BATCH_SIZE);
  console.log(
    `Sending ${emailAlertTuples.length} emails in ${emailBatches.length} batches.`,
  );

  for (const batch of emailBatches) {
    await Promise.all(
      batch.map((data: { email: string; alert: RegionVaccinePhaseInfo }) =>
        alertEmailService.sendAlertEmail(data.email, data.alert, dryRun),
      ),
    );
  }

  alertEmailService.logEmailsToBeSentStats();

  if (dryRun) {
    return;
  }

  // Exit with error if there is any errors sending the emails
  alertEmailService.logErrors();
  if (alertEmailService.errorCount >= 1) {
    console.log('Errors sending vaccination alert emails');
    process.exit(1);
  } else {
    // Update the email alert version for each location
    for (const alert of _.values(alertsByFips)) {
      await alertEmailService.updateVaccinationInfoVersion(alert);
    }
  }
}

if (require.main === module) {
  const { argv } = yargs.options({
    alertPath: {
      default: DEFAULT_ALERTS_FILE_PATH,
      description: 'alerts input path.',
    },
    dryRun: {
      default: false,
    },
    email: {
      type: 'string',
    },
  });

  const { alertPath, dryRun, email } = argv;
  main(alertPath, dryRun, email)
    .then(() => {
      console.log('Done.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error', err);
      process.exit(-1);
    });
}
