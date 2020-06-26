//@ts-ignore createsend has no types and throws an error
import firebase from 'firebase';
import fs from 'fs-extra';
import path from 'path';
import { Alert } from './interfaces';
import { getFirestore } from './firestore';
import { exit } from 'process';

/**
 * Takes a list of fips to alert on and a list of users who want to get alert
 * and generates a set of users to email in firestore like:
 *     - snapshots/<id>/locations/<fips>/emails/<email> => {sent: null }
 *
 * Takes in a file with {[fips: string]: {...data}} and generates documents
 * for each user to be emailed.
 *
 * You can run via `yarn create-lists-to-email fipsToAlertFilename currentSnapshot`
 */
(async () => {
    const outputFolder = path.join(__dirname);
    await fs.ensureDir(outputFolder);

    const {fipsToAlertFilename, currentSnapshot} = await parseArgs();
    const alertPath = path.join(outputFolder, fipsToAlertFilename);

    const rawdata = fs.readFileSync(alertPath, "utf8");
    const locationsWithAlerts: { [fips: string]: Alert } = JSON.parse(rawdata);

    const db = getFirestore();
    Object.keys(locationsWithAlerts).forEach(async (fips: string) => {
        console.log("fips", fips)
        db.collection('alerts-subscriptions').where("locations", "array-contains", fips).get()
            .then( (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    db.collection('snapshots').doc(`${currentSnapshot}/locations/${fips}/emails/${doc.id}`).set({
                        sentAt:null,
                    });
                });
                return;
            }).catch((err: any) => {console.log(err)});
    });

    console.log(`Done. Wrote users to firestore`);
})();

async function parseArgs(): Promise<{fipsToAlertFilename: string, currentSnapshot: string}> {
    const args = process.argv.slice(2);
     if (args.length == 2) {
        const fipsToAlertFilename = args[0];
        const currentSnapshot = args[1];
        return {fipsToAlertFilename, currentSnapshot};
    } else {
        exitWithUsage();
    }
  }

function exitWithUsage(): never {
    console.log('Usage: yarn create-lists-to-email fipsToAlertFilename currentSnapshot');
    process.exit(-1);
}