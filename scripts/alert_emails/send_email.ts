//@ts-ignore createsend has no types and throws an error
import createsend from 'createsend-node';
import fs from 'fs-extra';
import path from 'path';

interface EmailSendData {
    Subject: string,
    From: string,
    ReplyTo: string,
    To: string[],
    CC: string[],
    BCC: string [],
    Html: string,
    Text: string,
    Attachments: {[key: string]: string}[],
    TrackOpens: boolean,
    TrackClicks: boolean,
    InlineCSS: boolean,
    Group: string,
    AddRecipientsToListID: string,
    ConsentToTrack: "Yes" | "No" | "Unchanged",
}

async function sendEmail(
    api: any, data: EmailSendData): Promise<any> {
return new Promise((resolve, reject) => {
    api.transactional.sendClassicEmail(data, (err: any, result: any) => {
        if (err) { reject(err); }
        resolve(result);
    });
});
}

function generateSendData(useresToEmail, subject, html, text): EmailSendData {
    return {
        "Subject": subject,
        "From": "Susan Goldblatt <susan@covidactnow.org>",
        "ReplyTo": "susan@covidactnow.org",
        "To": useresToEmail,
        "CC": null,
        "BCC": null,
        "Html": html,
        "Text": text,
        "Attachments": null,
        "TrackOpens": true,
        "TrackClicks": true,
        "InlineCSS": true,
        "Group": null,
        "AddRecipientsToListID": null,
        "ConsentToTrack": "Unchanged",
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

    const {fipsToAlertFilename, usersToEmailFilename} = await parseArgs();
    const alertPath = path.join(outputFolder, fipsToAlertFilename);
    const usersToEmailPath = path.join(outputFolder, fipsToAlertFilename);

    const rawdata = fs.readFileSync(alertPath, "utf8");
    const locationsWithAlerts: { [fips: string]: { [key: string]: any } } = JSON.parse(rawdata);

    const usersRawData = fs.readFileSync(usersToEmailPath, "utf8");
    const usersToEmail: { [fips: string]: Array<string> } = JSON.parse(usersRawData);

    // TODO: maybe oauth here and add secrets into github.
    const auth = { apiKey: process.env.CREATE_SEND_TOKEN };
    const api: any = new createsend(auth);

    Object.entries(usersToEmail).map( ([fips, userList]) => {
        const testHTML = "<html> Test Email, Please Ignore</html>"
        const testText = "Test Email, Please Ignore";
        const result = await sendEmail(api, generateSendData(userList, "Test Email", testHTML, testText);
    })


    // write a file of an email to write
    // await fs.writeFile(file, JSON.stringify(usersToEmail));

    // console.log(`Done. Generated ${file}`);

})();

async function parseArgs(): Promise<{fipsToAlertFilename: string, usersToEmailFilename: string}> {
    const args = process.argv.slice(2);
    if (args.length == 2) {
        const fipsToAlertFilename = args[0];
        const usersToEmailFilename = args[1];
        return {fipsToAlertFilename, usersToEmailFilename};
    } else if (args.length == 3){
        const fipsToAlertFilename = args[0];
        const usersToEmailFilename = args[1];
    } else {
        exitWithUsage();
    }
  }

function exitWithUsage(): never {
    console.log('Usage: yarn send-emails fipsToAlertFilename usersToEmailFilename [test]');
    process.exit(-1);
}