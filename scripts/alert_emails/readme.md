# Email Alerting

The general process for email alerting is as follows
1) Generate the locations that need to be alered on
2) Get the users who need to be sent alerts (and write them to firestore)
3) Read the users from firestore and send them an email

We use handlebars to generate the email and send it via campaign monitor.

## Sending the Alerts via Github Actions
A github action will run all of these steps on github for you. Run that via

To create a draft of the emails that will be sent run:
`tools/send-alert-emails.sh <snapshot> <prod|staging|dev>`

To send the emails via the github action run:
`tools/send-alert-emails.sh <snapshot> <prod|staging|dev> true`

## Running the Alerts scripts manually

### To manually generate the alerts diffing
1) Update the `lastSnapshot` in firestore to be what you are diffing agaisnt [here](https://console.firebase.google.com/project/covidactnow-dev/database/firestore/data~2Finfo~2Falerts
2) Run `yarn generate-daily-alerts <new_snapshot>` which will diff agaisnt the value in `lastSnapshot` to generate an alerts.json file

### To manually create the list of users to email
1) Users sign up to the mailing list via the website and are stored in the alerts-subscriptions collection of firestore [dev](https://console.firebase.google.com/project/covidactnow-dev/database/firestore/data~2Falerts-subscriptions) with a field of locations that is an array of fips codes that the user has signed up to recieve alerts for.
2) Run `yarn create-lists-to-email fipsToAlertFilename <snapshot>` which will write to firestore snapshots/<snapshot>/locations/<fips>/emails for all the users
that need to recieve emails for each of the snapshots/fips.

### Sending the email
1) If you have run the above steps and have users signed up for emails in the following locations you can run `yarn send-emails alerts.json 497 true <youremail>` which will
send the emails to those users on dev.
2) You can also passin an extra param `yarn send-emails alerts.json 497 true <youremail>` which will send all the emails to one email address for testing.

## Testing Email HTMLs
In order to test out the emails and see what they look like:
1) Open template.html in your local browser to get a good sense of
2) Get the environment key from [campaign monitor](https://covidactnow.createsend.com/admin/account/apikeys)
(choose the top Covid Act Now from the list in the table) and run
`export CREATE_SEND_TOKEN=<api_token>`
3) Once your local browers looks good comment out the lines in
the send_emails.ts that writes the sent_at to firestore. (commented in the code)
4) Run
``` echo "{"11":{"fips":"11","locationName":"District of Columbia","locationURL":"https://covidactnow.org/us/dc/","lastUpdated":"06/26/2020","oldLevel":2,"newLevel":3}}
 > alerts.json` or generate the alerts.json via running the command `yarn generate-daily-alerts <new_snapshot>```
5) Update the firstore dev instance https://console.firebase.google.com/project/covidactnow-dev/database/firestore/data~2Fsnapshots~2F497~2Flocations~2F11~2Femails
and add a document with your email as the id and field `sentAt` to be null
6) Run the command `yarn send-emails alerts.json 497 true` to send the email to yourself
