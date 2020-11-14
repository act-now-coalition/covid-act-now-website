## Covid Act Now!

This is the code repository for https://covidactnow.org/ - a tool dedicated to encouraging public leaders and health officials to act quickly to curtail the spread of the COVID-19 pandemic.

If you are a Public leaders & health officials look at the other README.md.
If you are a dev trying to get started on this project look no further.

### Overview

A single page react app, created via `create-react-app`. Routing through `react-router`.


### Set Up

Get the repo from github
```
git clone https://github.com/covid-projections/covid-projections.git
```

Then install the correct dependencies locally via yarn.
```
yarn install
```

Then either start with npm or yarn

```
npm start
```

```
yarn start
```

The website should be thriving on `http://localhost:3000/`


Code should be automatically linted and formatted on commit, but to manually run the linter (which also reformats code with prettier) you can run:
```
yarn lint-fix
```

### Testing

Testing is run via cypress. Once cypress starts running, we need

```
npm test
```
```
yarn test
```

### Updating the Data Snapshot, Map Colors, etc.
The website renders data that's read from an API data snapshot (e.g.
https://data.covidactnow.org/snapshot/123/v2/). Every day we update the website
to point at the newest data snapshot. As part of this we also must update our
map colors to reflect the new status of states / counties, etc.

This is all automated (to do the updates and generate a Pull Request). To kick off the process you must get a
[personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line),
and run:

```bash
export GITHUB_TOKEN=<YOUR PERSONAL GITHUB TOKEN>
./tools/update-snapshot.sh <snapshot>
```