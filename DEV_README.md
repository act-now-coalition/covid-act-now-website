## Coronavirus Act Now! 

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


To run the linter (we currently run two): 
```
yarn prettier-fix
yarn lint-fix
```

If you find the counties/states data seems to be out of date with the data we have, we mainly generate a json via running:
(shoult take less than a minute or two to run)

```
./scripts/calculated_interventions.js 
```

### Testing 

Testing is run via cypress. Once cypress starts running, we need 

```
npm test
```
```
yarn test
```
