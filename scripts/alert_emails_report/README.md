# Alert Email Report

## Development Setup

- Download the Google Service Account JSON file for `alert-email-report@covidactnow-dev.iam.gserviceaccount.com` from [GCP](https://console.cloud.google.com/iam-admin/serviceaccounts?project=covidactnow-dev) and save it in `scripts/common/google-sheets`.
- Make sure that you have a valid Google Service Account file for Firestore (dev) in `scripts/alert_emails` (it can be downloaded from [Firebase Settings](https://console.firebase.google.com/u/1/project/covidactnow-dev/settings/serviceaccounts/adminsdk))
- Add the email `alert-email-report@covidactnow-dev.iam.gserviceaccount.com` as an Editor on the spreasheet.
- Run `yarn report-alert-emails`
