//@ts-ignore createsend has no types and throws an error
import createsend from 'createsend-node';
import admin from 'firebase-admin';
import fs from 'fs-extra';
import path from 'path';
import { Alert } from './interfaces';
import { getFirestore } from './firestore';

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
    api: any, data: EmailSendData, dryRun: boolean): Promise<SendEmailResult> {
    return new Promise((resolve, reject) => {
        if (dryRun) {return resolve({MessageID: "none", Recipient: "none", Status: "dry run"});}
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
            "img_alt": `Image depecting that the state went from from state ${alertForLocation.oldLevel} to ${alertForLocation.newLevel}`,
            "img_url": `${base_url}/therm-${alertForLocation.newLevel}-${alertForLocation.oldLevel}.png`,
            "last_updated": alertForLocation.lastUpdated,
            "location_url": alertForLocation.locationURL,
        },
        "AddRecipientsToList": null,
    }
}

async function setLastSnapshotNumber(firestore: FirebaseFirestore.Firestore, snapshot: string) {
    await firestore.doc('info/alerts').set({
        lastSnapshot: snapshot
    });
    console.log(`Set lastsnapshot to be ${snapshot}`)
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
(async () => {
    const outputFolder = path.join(__dirname);
    await fs.ensureDir(outputFolder);

    const { fipsToAlertFilename, currentSnapshot, dryRun } = await parseArgs();
    const alertPath = path.join(outputFolder, fipsToAlertFilename);

    const rawdata = fs.readFileSync(alertPath, "utf8");
    const locationsWithAlerts: { [fips: string]: Alert } = JSON.parse(rawdata);


    // TODO: maybe oauth here and add secrets into github.
    const auth = { apiKey: process.env.CREATE_SEND_TOKEN };
    const api: any = new createsend(auth);
    let emailSent = 0;
    const uniqueEmailAddress: {[email: string]: number} = {}
    const locationsWithEmails: {[fips: string]: number} = {}

    const db = getFirestore();
    for (const fips of Object.keys(locationsWithAlerts)) {
        await db.collection(`snapshots/${currentSnapshot}/locations/${fips}/emails/`)
            .where("sentAt", "==", null).get().then(async querySnapshot => {
                for (const doc of querySnapshot.docs) {
                    await sendEmail(api, generateSendData([doc.id], locationsWithAlerts[fips]), dryRun)
                        .then(async result => {
                            emailSent += 1;
                            uniqueEmailAddress[doc.id] = (uniqueEmailAddress[doc.id] || 0) + 1;
                            locationsWithEmails[fips] = (locationsWithEmails[fips] || 0) + 1;
                            if (dryRun) return;
                            await db.collection(`snapshots/${currentSnapshot}/locations/${fips}/emails/`).doc(doc.id)
                            .set({
                                sentAt: admin.firestore.FieldValue.serverTimestamp()
                            })
                        }).catch(err => {
                            console.log(err);
                            process.exit(-1);
                        });
                }
            });
    }
    console.log(`Total Emails to be sent: ${emailSent}. Total locations with emails ${Object.keys(locationsWithEmails).length}. Unique Email addresses ${Object.keys(locationsWithEmails).length}`)

    if (!dryRun) {
        setLastSnapshotNumber(db, currentSnapshot);
    }
    console.log(`Done.`);

})();

async function parseArgs(): Promise<{ fipsToAlertFilename: string, currentSnapshot: string, dryRun: boolean }> {
    const args = process.argv.slice(2);
    if (args.length == 2) {
        const fipsToAlertFilename = args[0];
        const currentSnapshot = args[1];
        return { fipsToAlertFilename, currentSnapshot, dryRun: true };
    } if (args.length == 3) {
        const fipsToAlertFilename = args[0];
        const currentSnapshot = args[1];
        const isSend = args[2] === "true";
        return { fipsToAlertFilename, currentSnapshot, dryRun: !isSend};
    } else {
        exitWithUsage();
    }
}


function exitWithUsage(): never {
    console.log('Usage: yarn send-emails fipsToAlertFilename currentSnapshot [send]');
    process.exit(-1);
}