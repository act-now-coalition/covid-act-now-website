# Firebase Usage

We use Firebase for various features:

* Alert Signups use Cloud Firestore for storing subscription info as well as
  progress info while sending alerts.
* We use Firebase Hosting with Firebase Functions for generating share / export
  images dynamically on-demand.

## Installing Firebase CLI
Run `yarn global add firebase-tools` or `npm install -g firebase-tools` to
install the Firebase CLI globally.

## Deploying
To deploy everything (Firestore rules / indexes, Hosting, Functions) to the
dev environment (covidactnow-dev), run:

```
firebase -P dev deploy
```

To deploy to the staging environment (covidactnow-staging), run:
```
firebase -P staging deploy
```

To deploy to the prod environment (covidactnow-prod), run:
```
firebase -P prod deploy
```

## Testing Hosting / Functions
To test hosting / functions locally:

```
# Run this from the 'firebase/functions' directory to watch / recompile TypeScript files.
`npm bin`/tsc -w

# Run this to run the hosting / functions local servers.
firebase serve
```

Then visit http://localhost:5000/ to test your hosting + functions code, e.g.
http://localhost:5000/share/0-123/states/ca/chart/0.png
