import { google } from 'googleapis';

async function main() {
  // TODO
  const auth = await google.auth.getClient({
    keyFile: './scripts/alert_emails/google-service-account.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets('v4');
  const spreadsheetId = '1cs3Wyh8Gda0H18_-x5RYp7AJ3FwB-I1ewAQTBWEk1YY';

  const res = await sheets.spreadsheets.values.get({
    auth,
    range: 'A1:D1',
    spreadsheetId,
  });
  console.log(res.data.values);
}

if (require.main === module) {
  main();
}
