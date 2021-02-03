# Vaccination Alerts

Outline of the workflow:

1. Generate the list of locations that need to be alerted
2. Generate a list of (user email, location) to be alerted
3. Send the emails

## 1. generate-vaccine-alerts-info

This script determines which locations have updated vaccination information by comparing the information in Firebase with the information from the CMS.

### Firebase

```yaml
info:
  vaccinationInfoUpdates:
    '11':
      emailAlertVersion: 0
    '12':
      emailAlertVersion: 0
```

### From the CMS

```yaml
'11':
  emailAlertVersion: 3 # Updated
  content: 'Phase A...'
'12':
  emailAlertVersion: 0
  content: 'Phase 1...'
'13':
  emailAlertVersion: 3 # New
  content: 'Phase 1...'
```

In this case, for example, we need to send emails for updates on location `"11"` and location `"13"` (location `"12"` didn't have any updates).

For locations that have updated information, we save a copy of the CMS information in the file `vaccination-alerts.json`. The information in `vaccination-alerts.json` will be used in later phases to determine the list of users to email and to render the emails.

```yaml
'11':
  emailAlertVersion: 3
  content: 'Phase A...'
'13':
  emailAlertVersion: 3
  content: 'Phase 1...'
```

## 2. generate-users-to-email

Using the locations in `vaccination-alerts.json`, we query email addresses subscribed to these locations from the the Firebase collection `alerts-subscriptions` (which is also used for our risk level alerts).

```yaml
alerts-subscriptions:
  pablo@covidactnow.org:
    locations: ['11']
  chelsi@covidactnow.org:
    locations: ['11', '13']
```

Then, we store the list of locations and email addresses to send in the Firebase collection `vaccination-alerts`, in the document `snapshotId`, so we can track the locations and users that we email each time.

```yaml
vaccination-alerts:
  '11':
    emailAlertVersions:
      '0':
        emails:
          pablo@covidactnow.org: { sentAt: null }
          chelsi@covidactnow.org: { sentAt: null }
      '3':
        emails:
          chelsi@covidactnow.org: { sentAt: null }
```

We update the `info` collection with the latest updated date.

```yaml
info:
  vaccinationInfoUpdates:
    '11':
      emailAlertVersion: 3 # Updated 0 -> 3
    '12':
      emailAlertVersion: 0
```

## 3. email users

We fetch the information for the current snapshot in `vaccination-alerts` to generate pairs of emails and locations

```yaml
- email: pablo@covidactnow.org
  fipsCode: 11
- email: chelsi@covidactnow.org
  fipsCode: 11
- email: chelsi@covidactnow.org
  fipsCode: 13
```

For each pair of (email, fipsCode), we get the information for the given location in the `vaccination-alerts.json` file, render and send the email to the user. We mark the email as sent in the collection `vaccination-alerts` by setting `sentAt` with the currrent date.
