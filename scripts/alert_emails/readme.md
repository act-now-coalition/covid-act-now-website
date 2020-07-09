# Email Alerting

The general process for email alerting is as follows

1. Generate the locations that need to be alerted on
2. Get the users who need to be sent alerts (and write them to firestore)
3. Read the users from firestore and send them an email

We use handlebars to generate the email and send it via CreateSend.

## Sending the Alerts via Github Actions

A github action will run all of these steps on github for you.

The script should be run after a new snapshot has been pushed to the prod website, in order to notify users of changes. You can get the currently live snapshot from https://github.com/covid-projections/covid-projections/blob/master/src/assets/data/data_url.json

Confirm the lastSnapshot field is
correct in firestore at (info/alerts)[https://console.firebase.google.com/project/covidactnow-prod/database/firestore/data~2Finfo~2Falerts]. The value of lastSnapshot should ideally be the previous snapshot from data_url.json (you can check what the previous snapshot was via the github file history). The github action should update the lastSnapshot field, but if the job failed for some reason it won't get updated. You can also check the snapshots collection in firestore to see what snapshots we've sent emails on prior.

Then do a dry-run to generate the alert locations and affected emails, but not actually send the emails. It will create a snapshot specific collection in firestore with the locations to alert and the emails to be alerted at each of those locations:

```bash
tools/send-alert-emails.sh <snapshot> <prod|staging|dev>
```

Go into firestore and check that the locations seem correct (make sure that locations have emails). You can also check the github action logs to see how many emails would be sent and how many email addresses would get emails.

Before running the alerting emails, to ensure you receive an alert, you can add yourself to one of the locations scheduled to receive an alert by adding a document with your email and a sentAt value of null.

Then send the emails via the github action run:

```bash
tools/send-alert-emails.sh <snapshot> <prod|staging|dev> true
```

You can check via campaign monitor that all the emails sent by going to the transactional email tab and clicking ungrouped emails (you should be able to view an example email and see the long list of receipents).

## Running the alerts scripts manually

### Signing up for the correct things

1. You will need to be able to access the campaign monitor api key to send messages (so ask an admin to get access to it)
2. You will also need to be able to access the firestore console so ask for aceess to that
3. If you are testing locally, you can use the covidactnow-dev service account found here: https://docs.google.com/document/d/1YoZUzmy6rYXwO1VSMrHklcD7pdCCLaOkGG-1kLwZpsg/

### To manually generate the alerts diffing

1. Update the `lastSnapshot` in firestore to be what you are diffing against [here](https://console.firebase.google.com/project/covidactnow-dev/database/firestore/data~2Finfo~2Falerts)
2. Run `yarn generate-daily-alerts <new_snapshot>` which will diff against the value in `lastSnapshot` to generate an `alerts.json` file

### To manually create the list of users to email

1. Users sign up to the mailing list via the website and are stored in the alerts-subscriptions collection of firestore [dev](https://console.firebase.google.com/project/covidactnow-dev/database/firestore/data~2Falerts-subscriptions) with a field of locations that is an array of fips codes that the user has signed up to recieve alerts for.
2. Run `yarn create-lists-to-email fipsToAlertFilename <snapshot>` which will write to firestore `snapshots/<snapshot>/locations/<fips>/emails` for all the users that need to recieve emails for each of the snapshots/fips.

### Sending the email

1. If you have run the above steps and have users signed up for emails in the following locations you can run `yarn send-emails alerts.json 497 true <youremail>` which will send the emails to those users on dev.
2. You can also passin an extra param `yarn send-emails alerts.json 497 true <youremail>` which will send all the emails to one email address for testing.

## Testing Email HTMLs

In order to test out the emails and see what they look like:

1. Open template.html in your local browser to get a good sense of
2. Get the environment key from [campaign monitor](https://covidactnow.createsend.com/admin/account/apikeys)
   (choose the top Covid Act Now from the list in the table) and run
   `export CREATE_SEND_TOKEN=<api_token>`
3. Once your local browers looks good comment out the lines in
   the send_emails.ts that writes the sent_at to firestore. (commented in the code)
4. Run

   ```bash
   echo "{"11":{"fips":"11","locationName":"District of Columbia","locationURL":"https://covidactnow.org/us/dc/","lastUpdated":"06/26/2020","oldLevel":2,"newLevel":3}" > alerts.json
   ```

   or generate the alerts.json via running the command `yarn generate-daily-alerts <new_snapshot>`

5. Update the firstore dev instance https://console.firebase.google.com/project/covidactnow-dev/database/firestore/data~2Fsnapshots~2F497~2Flocations~2F11~2Femails
   and add a document with your email as the id and field `sentAt` to be null
6. Run the command `yarn send-emails alerts.json 497 true` to send the email to yourself
