import admin from 'firebase-admin';
import { getFirestore } from '../common/firebase';
import { RegionVaccineVersionMap } from './utils';

export const ALERT_SUBSCRIPTIONS = 'alerts-subscriptions';
export const INVALID_ALERT_SUBSCRIPTIONS = 'invalid-alert-subscriptions';
export const VACCINATION_ALERTS = 'vaccination-alerts';
export const VACCINATION_INFO_UPDATES = 'vaccination-info-updates';

class FirestoreSubscriptions {
  private readonly db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = getFirestore();
  }

  public async getVaccinationInfoVersion() {
    return this.db.collection(VACCINATION_INFO_UPDATES).get();
  }

  public async getVaccinationInfoByFips(): Promise<RegionVaccineVersionMap> {
    const vaccinationInfoVersion = await this.getVaccinationInfoVersion();

    return vaccinationInfoVersion.docs.reduce((prev, curr) => {
      const data = curr.data();
      const emailAlertVersion = data['email-alert-version'];
      return { ...prev, [curr.id]: { emailAlertVersion } };
    }, {});
  }

  public async updateVaccinationInfoVersion(
    fipsCode: string,
    emailAlertVersion: number,
  ) {
    return this.db.collection(VACCINATION_INFO_UPDATES).doc(fipsCode).set({
      'email-alert-version': emailAlertVersion,
    });
  }

  public async getAlertSubscriptions() {
    return this.db.collection(ALERT_SUBSCRIPTIONS).get();
  }

  private async getEmailsCollectionForVersion(
    fipsCode: string,
    emailAlertVersion: number,
  ): Promise<
    FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
  > {
    return this.db
      .collection(VACCINATION_ALERTS)
      .doc(fipsCode)
      .collection('email-versions')
      .doc(`${emailAlertVersion}`)
      .collection('emails');
  }

  public async getEmailsToBeSentForVersion(
    fipsCode: string,
    emailAlertVersion: number,
  ) {
    const emailsCollection = await this.getEmailsCollectionForVersion(
      fipsCode,
      emailAlertVersion,
    );
    const querySnapshot = await emailsCollection
      .where('sentAt', '==', null)
      .get();
    return querySnapshot.docs.map(emailDoc => emailDoc.id);
  }

  public async markEmailToSend(
    fipsCode: string,
    emailAlertVersion: number,
    emailAddress: string,
  ) {
    const emailsCollection = await this.getEmailsCollectionForVersion(
      fipsCode,
      emailAlertVersion,
    );
    return emailsCollection.doc(emailAddress).create({ sentAt: null });
  }

  public async markEmailAsSent(
    fipsCode: string,
    emailAlertVersion: number,
    emailAddress: string,
  ) {
    const emailsCollection = await this.getEmailsCollectionForVersion(
      fipsCode,
      emailAlertVersion,
    );
    return emailsCollection
      .doc(emailAddress)
      .update({ sentAt: admin.firestore.FieldValue.serverTimestamp() });
  }

  public async removeInvalidEmailFromAlerts(emailAddress: string) {
    const querySnapshot = await this.db
      .collection(ALERT_SUBSCRIPTIONS)
      .doc(emailAddress)
      .get();
    const foundEmail = querySnapshot.data();
    if (foundEmail) {
      await this.db
        .collection(INVALID_ALERT_SUBSCRIPTIONS)
        .doc(emailAddress)
        .set(foundEmail);
      await this.db.collection(ALERT_SUBSCRIPTIONS).doc(emailAddress).delete();
    }
  }
}

export default FirestoreSubscriptions;
