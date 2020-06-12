//@ts-ignore createsend has no types and throws an error
import createsend from 'createsend-node';
import fs from 'fs-extra';
import path from 'path';

const ALERT_LIST_CUSTOM_FIELD = "[alert_list_csv]";
const ALERT_SIGNUPS_LIST_ID = "768d7917086d0c35bfa52b95af2a67e7";

interface Subscriber {
    EmailAddress: string,
    Name: string,
    Date: string,
    State: 'Active' | 'Unconfirmed' | 'Unsubscribed' | 'Bounced' | 'Deleted',
    CustomFields: Array<{ Key: string, Value: any }>,
    ReadsEmailWith: string, // often empty
}

interface ActiveSubscriberResult {
    Results: Array<Subscriber>,
    ResultsOrderedBy: string,
    OrderDirection: 'asc' | 'desc',
    PageNumber: number,
    PageSize: number,
    RecordsOnThisPage: number,
    TotalNumberOfRecords: number,
    NumberOfPages: number,
}

async function getSubscribersForList(
        pageToGet: number, api: any, list_id: string): Promise<ActiveSubscriberResult> {
    return new Promise((resolve, reject) => {
        api.lists.getActiveSubscribers(list_id, { page: pageToGet }, (err: any, result: ActiveSubscriberResult) => {
            if (err) { reject(err); }
            resolve(result);
        });
    });
}

/**
 * Generates a file of fips and corresponding users to email with alerts
 * for that fips.
 *
 * Takes in a file with {[fips: string]: {...data}}
 *
 * You can run via `yarn create-lists-to-email fipsToAlertFilename [outputfileName]`
 *
 * Generates a file alerts/users-to-email.json containing an object of fips and
 * users to send an email to.
 */
(async () => {
    const outputFolder = path.join(__dirname);
    await fs.ensureDir(outputFolder);

    const {fipsToAlertFilename, outputFilename} = await parseArgs();
    const alertPath = path.join(outputFolder, fipsToAlertFilename);

    const rawdata = fs.readFileSync(alertPath, "utf8");
    const locationsWithAlerts: { [fips: string]: { [key: string]: any } } = JSON.parse(rawdata);

    // fips to object with a list of users and the previous meta data
    const usersToEmail: { [fips: string]: Array<string> } = {};

    // TODO: maybe oauth here and add secrets into github.
    const auth = { apiKey: process.env.CREATE_SEND_TOKEN };
    const api: any = new createsend(auth);

    let pageToGet = 1;
    let numberPages = 1;

    while (pageToGet <= numberPages) {
        const result = await getSubscribersForList(pageToGet, api, ALERT_SIGNUPS_LIST_ID)
        result.Results.filter(subscriber => subscriber.State === 'Active').forEach((subscriber: Subscriber) => {
            subscriber.CustomFields
                .filter(field => field.Key === ALERT_LIST_CUSTOM_FIELD)
                .map(field => field.Value.split(","))
                .forEach((alertLocations: string[]) => {
                    alertLocations.forEach((fips: string) => {
                        // if the location the user signed up for has an alert
                        if (locationsWithAlerts[fips]) {
                            const userListForFips = usersToEmail[fips] || [];
                            userListForFips.push(subscriber.EmailAddress)
                            usersToEmail[fips] = userListForFips;
                        }
                    });
            });
        });
        numberPages = result.NumberOfPages;
        pageToGet += 1
    }

    // note that this file is only temporary and should not be saved
    const file = path.join(outputFolder, outputFilename);
    await fs.writeFile(file, JSON.stringify(usersToEmail));

    console.log(`Done. Generated ${file}`);

})();

async function parseArgs(): Promise<{fipsToAlertFilename: string, outputFilename: string}> {
    const args = process.argv.slice(2);
    const defaultFilename = 'users-to-email.json';
    if (args.length === 1) {
        const fipsToAlertFilename = args[0];
        return {fipsToAlertFilename, outputFilename: defaultFilename};
    } else if (args.length == 2) {
        const fipsToAlertFilename = args[0];
        const outputFilename = args[1];
        return {fipsToAlertFilename, outputFilename};
    } else {
        exitWithUsage();
    }
  }

function exitWithUsage(): never {
    console.log('Usage: yarn create-lists-to-email fipsToAlertFilename [outputfileName]');
    process.exit(-1);
}