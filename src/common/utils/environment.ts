export enum Environment {
  PROD, // covidactnow.org
  STAGING, // staging.covidactnow.org
  DEV, // everything else (local development and Vercel previews)
}

export function getEnvironment() {
  const env = process.env.REACT_APP_ENVIRONMENT;
  switch (env) {
    case 'prod':
      return Environment.PROD;
    case 'staging':
      return Environment.STAGING;
    default:
      return Environment.DEV;
  }
}
