> [!CAUTION]
> This page is no longer being updated due to a lack of reliable data. While we continue to surface this content for archival purposes, we recommend that you visit more regularly updated resources, such as from the [CDC](https://www.cdc.gov/coronavirus/2019-ncov/index.html).

# Covid Act Now

This is the code repository for https://covidactnow.org/.

### Overview

A single page react app, created via `create-react-app`. Routing through `react-router`.


### Set Up

Make sure you have node installed. [nvm](https://github.com/nvm-sh/nvm) is recommended to manage your node installation so you can easily switch between versions.  node v16.x works well. Once nvm is installed:
```
nvm install v16
nvm alias default v16
```

Get the repo from github
```
git clone https://github.com/act-now-coalition/covid-act-now-website.git
```

Then install the correct dependencies locally via yarn.
```
yarn install
```

Then start the local dev server:
```
yarn start
```

The website should be thriving on `http://localhost:3000/`


Code should be automatically linted and formatted on commit, but to manually run the linter (which also reformats code with prettier) you can run:
```
yarn lint-fix
```

### Testing

Testing is run via jest.
```
yarn jest
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
