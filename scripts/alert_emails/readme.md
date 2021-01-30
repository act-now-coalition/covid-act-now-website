# Email Alerting

CAN sends email alerts to subscribed users notifying them when states/counties change risk levels. These are automated via a github workflow (see .github/workflows/send-alert-emails.yml).

The workflow works by running the following 3 scripts:
1. **generate_daily_alerts.ts** - Given a snapshot ID, it compares the alert
   levels of states/counties against the last time alerts were sent and
   generates an alerts.json file with the changes.
2. **create_lists_to_email.ts** - Writes documents to Firestore indicating
   all of the users for each location that need to be sent an email alert.
3. **send_emails.ts** - Sends the actual emails to users, updating their
   entry in Firestore after each one to indicate that it's complete.

We use handlebars to generate the email from template.html and then send it
using AWS Simple Email Service.

## Sending the Alerts via Github Actions

A github action will run all of these steps on github for you.

The script should be run after a new snapshot has been pushed to the prod website, in order to notify users of changes. You can get the currently live snapshot from https://github.com/covid-projections/covid-projections/blob/main/src/assets/data/data_url.json

Confirm the lastSnapshot field is
correct in firestore at (info/alerts)[https://console.firebase.google.com/project/covidactnow-prod/database/firestore/data~2Finfo~2Falerts]. The value of lastSnapshot should be the last snapshot we sent emails for (the script updates it on completion). You can verify it's set correctly by checking the snapshots collection in firestore to see what snapshots we've sent emails on prior.

Then do a dry-run to generate the alert locations and affected emails, but not actually send the emails. It will create a snapshot specific collection in firestore with the locations to alert and the emails to be alerted at each of those locations:

```bash
tools/send-alert-emails.sh <snapshot> <prod|staging|dev>
```

Go into firestore and check that the locations seem correct (make sure that locations have emails). You can also check the github action logs to see how many emails would be sent and how many email addresses would get emails.

Before running the alerting emails, to ensure you receive an alert, you can add yourself to one of the locations scheduled to receive an alert by adding a document with your email and a sentAt value of null.

Then to send the emails via the github action run:

```bash
tools/send-alert-emails.sh <snapshot> <prod|staging|dev> true
```

The github action should complete in 20 minutes or so and list the number of emails sent in the logs.

## Running the alerts scripts manually

### Signing up for the correct things

1. You will need to be able to use AWS Simple Email Service. There's an API key here: https://docs.google.com/document/d/1LJkCgikoTByi3xKF87f9nA6X2DwiMwa_FFk_CFa8Feo/edit
2. You will also need to be able to access the firestore console so ask for access to that.
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

## Testing Email HTML

In order to test out the emails and see what they look like:

1. Open template.html in your local browser to get a good sense of what it looks like.
2. Set the environment variables for a valid AWS access key (see https://docs.google.com/document/d/1LJkCgikoTByi3xKF87f9nA6X2DwiMwa_FFk_CFa8Feo/edit).
3. Run: `yarn send-test-email <your-email>`
