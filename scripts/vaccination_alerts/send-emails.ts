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
  locationsWithEmails: { [fips: string]: number } = {};

  constructor() {
    this.firestoreSubscriptions = new FirestoreSubscriptions();
    this.emailService = new EmailService();
  }

  private async onEmailSent(email: string, alert: RegionVaccinePhaseInfo) {
    this.updateSentEmailCounters(email, alert);
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

  private updateSentEmailCounters(
    email: string,
    alert: RegionVaccinePhaseInfo,
  ) {
    this.emailSent += 1;
    this.uniqueEmailAddress[email] = (this.uniqueEmailAddress[email] || 0) + 1;
    // Todo don't make just fips
    const key = (alert.fips, alert.emailAlertVersion);
    this.locationsWithEmails[key] = (this.locationsWithEmails[key] || 0) + 1;
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
    const { emailSent, invalidEmailCount } = this;
    console.log('Errors sending vaccination alert emails');
    console.log(`Emails sent: ${emailSent}`);
    console.log(`Invalid emails removed: ${invalidEmailCount}`);
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
      this.updateSentEmailCounters(email, alert);
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
        console.error(
          `Error sending email ${email}, ${alert.fips} - ${alert.emailAlertVersion}.`,
          err,
        );
        this.errorCount += 1;
      }
    }
  }
}

/**
 * Given a list of users to email and a list of locations, email those
 * users with alert information about those locations.
 *
 * Takes in a file with {[fips: string]: {...data}} and file like {[fips: string]: [emails]}
 *
 * Also takes in a parameter to actual send the email. Otherwise will just generate the files
 *
 * You can run via `yarn send-emails fipsToAlertFilename currentSnapshot [send]`
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
  if (alertEmailService.errorCount >= 1) {
    alertEmailService.logErrors();
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
      default: true,
    },
    email: {
      type: 'string',
    },
  });

  main(argv.alertPath, argv.dryRun, argv.email)
    .then(() => {
      console.log('Done.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error', err);
      process.exit(-1);
    });
}
