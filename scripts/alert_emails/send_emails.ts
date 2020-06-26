//@ts-ignore createsend has no types and throws an error
import createsend from 'createsend-node';
import firebase from 'firebase';
import fs from 'fs-extra';
import path from 'path';
import { Alert } from './interfaces';
import { getFirebase } from 'common/firebase';

interface EmailSendData {
    To: string[] | null,
    CC: string[] | null,
    BCC: string[] | null,
    smartEmailID: string,
    Attachments: { [key: string]: string }[] | null,
    data: { [key: string]: any } | null,
    AddRecipientsToList: string | null,
}

interface SendEmailResult {
    MessageID: string,
    Recipient: string,
    Status: string,
}

interface CampaignMonitorError {
    Code: number,
    Message: string
}

async function sendEmail(
    api: any, data: EmailSendData): Promise<SendEmailResult> {
    return new Promise((resolve, reject) => {
        api.transactional.sendSmartEmail(data, (err: any, result: any) => {
            if (err) { console.log(err); reject(err); }
            resolve(result);
        });
    });
}

function generateSendData(usersToEmail: string[], alertForLocation: Alert) : EmailSendData {
    const base_url = "https://data.covidactnow.org/thermometer_screenshot"
    return {
        "To": usersToEmail,
        "CC": null,
        "BCC": null,
        "Attachments": null,
        "smartEmailID": `${process.env.SMART_EMAIL_ID}`,
        "data": {
            "change": (alertForLocation.newLevel < alertForLocation.oldLevel) ? "DECREASED": "INCREASED",
            "location_name": alertForLocation.locationName,
            "img_url": `${base_url}/therm-${alertForLocation.newLevel}-${alertForLocation.oldLevel}.png`,
            "last_updated": alertForLocation.lastUpdated,
            "location_url": alertForLocation.locationURL,
        },
        "AddRecipientsToList": null,
    }
}

/**
 * Given a list of users to email and a list of locations, email those
 * users with alert information about those locations.
 *
 * Takes in a file with {[fips: string]: {...data}} and file like {[fips: string]: [emails]}
 *
 * You can run via `yarn send-email fipsToAlertFilename currentSnapshot`
 */
(async () => {
    const outputFolder = path.join(__dirname);
    await fs.ensureDir(outputFolder);

    const { fipsToAlertFilename, currentSnapshot } = await parseArgs();
    const alertPath = path.join(outputFolder, fipsToAlertFilename);

    const rawdata = fs.readFileSync(alertPath, "utf8");
    const locationsWithAlerts: { [fips: string]: Alert } = JSON.parse(rawdata);


    // TODO: maybe oauth here and add secrets into github.
    const auth = { apiKey: process.env.CREATE_SEND_TOKEN };
    const api: any = new createsend(auth);
    const err_results: CampaignMonitorError[] = []

    const db = getFirebase().firestore();
    Object.keys(locationsWithAlerts).map(async (fips) => {
        db.collection(`snapshots/${currentSnapshot}/locations/${fips}/emails/`)
            .where("sentAt", "==", null).get().then(querySnapshot => {
                querySnapshot.forEach(async doc => {
                    await sendEmail(api, generateSendData([doc.id], locationsWithAlerts[fips]))
                        .then(async result => {
                            console.log(result)
                            await db.collection(`snapshots/${currentSnapshot}/locations/${fips}/emails/`).doc(doc.id).set({sentAt: firebase.firestore.FieldValue.serverTimestamp()})
                        }).catch(err => {
                            console.log(err);
                            err_results.push(err) // more elegantly handle the errors here?
                        });
                })
            });
        });

    console.log(`Done.`);

})();

async function parseArgs(): Promise<{ fipsToAlertFilename: string, currentSnapshot: string }> {
    const args = process.argv.slice(2);
    if (args.length == 2) {
        const fipsToAlertFilename = args[0];
        const currentSnapshot = args[1];
        return { fipsToAlertFilename, currentSnapshot };
    } else {
        exitWithUsage();
    }
}


function exitWithUsage(): never {
    console.log('Usage: yarn send-emails fipsToAlertFilename currentSnapshot');
    process.exit(-1);
}