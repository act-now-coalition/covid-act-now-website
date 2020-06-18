//@ts-ignore createsend has no types and throws an error
import createsend from 'createsend-node';
import fs from 'fs-extra';
import path from 'path';
import { Alert } from './interfaces';
import moment from 'moment';

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

function generateSendData(usersToEmail: string[], locationName: string, currentValue: number, previousValue: number): EmailSendData {
    const base_url = "https://data.covidactnow.org/thermometer_screenshot"
    return {
        "To": usersToEmail,
        "CC": null,
        "BCC": null,
        "Attachments": null,
        "smartEmailID": `${process.env.SMART_EMAIL_ID}`,
        "data": {
            "change": (currentValue < previousValue) ? `${base_url}/email_decreased.png`: `${base_url}/email_increased.png`,
            "location_name": locationName,
            "img_url": `${base_url}/therm-${currentValue}-${previousValue}.png`,
            "last_updated": moment.utc().format("MM/DD/YYYY"),
            "learn_more_link": 'https://covidactnow.org/',
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
 * You can run via `yarn send-email fipsToAlertFilename usersToEmailFilename [test]`

 */
(async () => {
    const outputFolder = path.join(__dirname);
    await fs.ensureDir(outputFolder);

    const { fipsToAlertFilename, usersToEmailFilename } = await parseArgs();
    const alertPath = path.join(outputFolder, fipsToAlertFilename);
    const usersToEmailPath = path.join(outputFolder, usersToEmailFilename);

    const rawdata = fs.readFileSync(alertPath, "utf8");
    const locationsWithAlerts: { [fips: string]: Alert } = JSON.parse(rawdata);

    const usersRawData = fs.readFileSync(usersToEmailPath, "utf8");
    const usersToEmail: { [fips: string]: Array<string> } = JSON.parse(usersRawData);

    // TODO: maybe oauth here and add secrets into github.
    const auth = { apiKey: process.env.CREATE_SEND_TOKEN };
    const api: any = new createsend(auth);
    const results_array: SendEmailResult[] = [];
    const err_results: CampaignMonitorError[] = []
    Object.entries(usersToEmail).map(async ([fips, userList]) => {
        const testHTML = `<html> Test Alert Email for ${fips}, ${locationsWithAlerts[fips].locationName} went from ${locationsWithAlerts[fips].oldLevel} to ${locationsWithAlerts[fips].newLevel}</html>`;
        const testText = "Test Email, Please Ignore";
        await sendEmail(api, generateSendData(
            userList,locationsWithAlerts[fips].locationName,
             locationsWithAlerts[fips].newLevel, locationsWithAlerts[fips].oldLevel))
            .then(result => {
                console.log(result)
                results_array.push(result);
            }).catch(err => {
                console.log(err);
                err_results.push(err)
            });

    })

    // write a file of an email to write
    const file = path.join(outputFolder, `${(new Date()).toISOString()}-email-output.json`);
    let resultWriteUp = `Emails sent successfully: ${results_array.filter(result => result.Status === 'Accepted').length}`;
    resultWriteUp += `Total Emails: ${results_array.length}`
    await fs.writeFile(file, resultWriteUp);
    console.log(`Done. Generated ${file}`);

})();

async function parseArgs(): Promise<{ fipsToAlertFilename: string, usersToEmailFilename: string }> {
    const args = process.argv.slice(2);
    if (args.length == 2) {
        const fipsToAlertFilename = args[0];
        const usersToEmailFilename = args[1];
        return { fipsToAlertFilename, usersToEmailFilename };
        // } else if (args.length == 3){
        //     const fipsToAlertFilename = args[0];
        //     const usersToEmailFilename = args[1];
    } else {
        exitWithUsage();
    }
}

// yarn send-emails alerts/495-497.json users-to-email.json

function exitWithUsage(): never {
    console.log('Usage: yarn send-emails fipsToAlertFilename usersToEmailFilename [test]');
    process.exit(-1);
}