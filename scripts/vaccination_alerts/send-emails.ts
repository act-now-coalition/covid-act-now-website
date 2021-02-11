import _ from 'lodash';
import admin from 'firebase-admin';
import { getFirestore } from '../common/firebase';
import EmailService, {
  EmailSendData,
  isInvalidEmailError,
} from '../alert_emails/email-service';
import * as yargs from 'yargs';
import { DEFAULT_ALERTS_FILE_PATH, readVaccinationAlerts } from './utils';
import { RegionVaccinePhaseInfo } from '../../src/cms-content/vaccines/phases';

const BATCH_SIZE = 20;

class SendVaccinationAlertsService {
  db: FirebaseFirestore.Firestore;
  emailService: EmailService;

  invalidEmailCount: number = 0;
  errorCount: number = 0;
  emailSent: number = 0;

  uniqueEmailAddress: { [email: string]: number } = {};
  locationsWithEmails: { [fips: string]: number } = {};

  constructor(db: FirebaseFirestore.Firestore, emailService: EmailService) {
    this.db = db;
    this.emailService = emailService;
  }

  private async onEmailSent(email: string, alert: RegionVaccinePhaseInfo) {
    this.updateSentEmailCounters(email, alert);
    const docPath = `${alert.fips}/emailVersions/${alert.emailAlertVersion}/emails/${email}`;
    return this.db
      .collection('vaccination-alerts')
      .doc(docPath)
      .set({ sentAt: admin.firestore.FieldValue.serverTimestamp() });
  }

  private async onInvalidEmail(email: string) {
    this.invalidEmailCount += 1;
    const querySnapshot = await this.db
      .collection('alerts-subscriptions')
      .doc(email)
      .get();
    const currentData = querySnapshot.data();
    if (currentData) {
      await this.db
        .collection('invalid-alert-subscriptions')
        .doc(email)
        .set(currentData);
      await this.db.collection('alerts-subscriptions').doc(email).delete();
    }
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
    const docPath = `${alert.fips}/emailVersions/${alert.emailAlertVersion}/emails/`;
    const querySnapshot = await this.db
      .collection(`vaccination-alerts/${docPath}`)
      .where('sentAt', '==', null)
      .get();
    return querySnapshot.docs.map(emailDoc => emailDoc.id);
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

    // @ts-ignore
    let sendData: EmailSendData = null; //  generateAlertEmailData(email, locationAlert);
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

  const emailService = new EmailService();
  const db = getFirestore();

  const alertEmailService = new SendVaccinationAlertsService(db, emailService);

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
    `Sending ${emailAlertTuples.length} emails/${emailBatches.length} batches.`,
  );
  for (const batch of emailBatches) {
    await Promise.all(
      batch.map((data: { email: string; alert: RegionVaccinePhaseInfo }) =>
        alertEmailService.sendAlertEmail(data.email, data.alert, dryRun),
      ),
    );
  }
  const emailsSent = alertEmailService.emailSent;
  const errorCount = alertEmailService.errorCount;
  const uniqueEmailAddresses = alertEmailService.uniqueEmailAddress;
  const invalidEmailAddresses = alertEmailService.invalidEmailCount;
  console.info(`Total emails to be sent: ${emailsSent}.`);
  console.info(
    `Unique Email addresses: ${Object.keys(uniqueEmailAddresses).length}.`,
  );
  console.info(`Invalid emails removed: ${invalidEmailAddresses}.`);

  if (!dryRun) {
    // setLastSnapshotNumber(db, `${currentSnapshot}`);
    // If we aren't in a dry run but there's clearly some non trivial errors exit with error
    if (emailsSent < 1 || errorCount > 1) {
      console.log(
        `Error count: ${errorCount}. Emails sent: ${emailsSent}. Invalid emails removed: ${invalidEmailAddresses}`,
      );
      process.exit(1);
    }
  }
  console.info(`Done.`);
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
