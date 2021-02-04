import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

const ALERTS_SUBSCRIPTIONS_COLLECTION = 'alerts-subscriptions';

export interface Subscription {
  email: string;
  locations: string[];
  subscribedAt: Date;
}

export async function fetchAllAlertSubscriptions(
  db: FirebaseFirestore.Firestore,
): Promise<Subscription[]> {
  return new Promise(function (resolve, reject) {
    const subscriptions: Subscription[] = [];
    db.collection(ALERTS_SUBSCRIPTIONS_COLLECTION)
      .stream()
      .on('data', subscription => {
        const data = subscription.data();
        // Convert Firestore timestamp to plain Date.
        data.subscribedAt = data.subscribedAt && data.subscribedAt.toDate();
        subscriptions.push(data);
      })
      .on('end', () => {
        resolve(subscriptions);
      })
      .on('error', reject);
  });
}
