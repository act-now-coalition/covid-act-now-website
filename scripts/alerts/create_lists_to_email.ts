//@ts-ignore
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
 * You can run via `yarn create-lists-to-email`
 *
 * Generates a file alerts/users-to-email.json containing an object of fips and
 * users to send an email to. See the Alert interface below for schema.
 */
(async () => {

    // Sample fips, will eventually be json loaded from a file
    const locationsWithAlerts: { [fips: string]: { [key: string]: any } } = {
        "06": { "overall": true },
        "13127": { "overall": true }
    }

    // fips to object with a list of users and the previous meta data
    const usersToEmail: { [fips: string]: Array<string> } = {};

    // TODO: use oauth here and add secrets into github.
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

    const outputFolder = path.join(__dirname, 'alerts');
    await fs.ensureDir(outputFolder);
    const file = path.join(outputFolder, `users-to-email.json`);
    await fs.writeFile(file, JSON.stringify(usersToEmail));

    console.log(`Done. Generated ${file}`);

})();