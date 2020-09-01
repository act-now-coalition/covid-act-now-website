# Firebase Usage

We use Firebase for various features:

- Alert Signups use Cloud Firestore for storing subscription info as well as progress info while sending alerts.
- We use Firebase Hosting with Firebase Functions for generating share / export images dynamically on-demand.

## Installing Firebase CLI

Run `yarn global add firebase-tools` or `npm install -g firebase-tools` to install the Firebase CLI globally.

## Deploying

To deploy everything (Firestore rules / indexes, Hosting, Functions) to the dev environment (covidactnow-dev), run:

```sh
firebase -P dev deploy
```

To deploy to the staging environment (covidactnow-staging), run:

```sh
firebase -P staging deploy
```

To deploy to the prod environment (covidactnow-prod), run:

```sh
firebase -P prod deploy
```

## Testing Hosting / Functions

Before running the functions locally for the first time, you will need to login and choose the environment to run

```sh
# This will open the browser to authorize and authenticate the Firebase CLI
firebase login

# This will use the development configuration by default
firebase use dev
```

To test hosting / functions locally:

```sh
# Run this from the 'firebase/functions' directory to watch / recompile TypeScript files.
`npm bin`/tsc -w

# Run this to run the hosting / functions local servers.
firebase serve
```

Then visit http://localhost:5000/ to test your hosting + functions code, e.g.
http://localhost:5000/share/0-123/states/ca/chart/0.png

## Learn More

- [Firebase CLI](https://firebase.google.com/docs/clis)
