> [!CAUTION]
> This page is no longer being updated due to limited data availability. We continue to surface this content for archival purposes.

# Covid Act Now

This is the code repository for https://covidactnow.org/.

### Overview

A single page react app, created via `create-react-app`. Routing through `react-router`.


### Set Up

Make sure you have node installed. [nvm](https://github.com/nvm-sh/nvm) is recommended to manage your node installation so you can easily switch between versions. Node v22.x is recommended. Once nvm is installed:
```
nvm install v22
nvm alias default v22
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
